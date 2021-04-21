import validation from '../helper/validation.js'
import {
  updateBalance as repoUpdateBalance,
  searchAccount as repoSearchAccount,
  searchAccountsFromAgency as repoSearchAccountsFromAgency,
  deleteAccount as repoDeleteAccount,
} from './../repository/account.js'

const NO_TAX = 0
const TAX_OF_WITHDRAW = 1
const TAX_TRANSFER = 8
const OPERATION_DEPOSIT = 'deposit'
const OPERATION_WITHDRAW = 'withdraw'
const OPERATIONS = [OPERATION_DEPOSIT, OPERATION_WITHDRAW]

export const doDeposit = async (account) => {
  return updateBalance(account, OPERATION_DEPOSIT)
}

export const doWithdraw = async (account, tax = TAX_OF_WITHDRAW) => {
  return updateBalance(account, OPERATION_WITHDRAW, tax)
}

export const getBalance = async (account) => {
  validateAccountWithoutValue(account)
  account = await verifyIfAccountExists(account, true)
  return account
}

export const deleteAccount = async (account) => {
  validateAccountWithoutValue(account)
  await repoDeleteAccount(account)
  return (await repoSearchAccountsFromAgency(account)).length
}
export const doTransfer = async (sourceAccount, destinationAccount, value) => {
  validation.validateNumberField(sourceAccount.agencia, 'Agência de Origem')
  validation.validateNumberField(sourceAccount.conta, 'Conta de Origem')
  validation.validateNumberField(
    destinationAccount.agencia,
    'Agência de Destino'
  )
  validation.validateNumberField(destinationAccount.conta, 'Conta de Destinom')
  validation.validateNumberField(value, 'Valor')

  let tax = 0
  if (sourceAccount.agencia !== destinationAccount.agencia) {
    tax = TAX_TRANSFER
  }

  sourceAccount.valor = value
  destinationAccount.valor = value
  const balanceSourceAccount = await doWithdraw(sourceAccount, tax)
  await doDeposit(destinationAccount)

  return balanceSourceAccount
}

const updateBalance = async (account, type, tax = 0) => {
  const { agencia, conta, valor } = account

  validateAccountWithValue(account)

  if (OPERATIONS.indexOf(type) === -1) {
    throw new Error('Operação inválida.')
  }

  let valorOperation = parseInt(valor)
  let errorMessage = 'O valor a ser depositado precisa ser positivo.'
  if (type === OPERATION_WITHDRAW) {
    valorOperation = parseInt(valor) + tax

    account = await verifyIfAccountExists(account, true)

    if (account.balance < valorOperation) {
      throw new Error('Saldo insuficiente.')
    }

    valorOperation *= -1
    errorMessage = 'O valor a ser sacado precisa ser positivo.'
  }

  if (parseInt(valor) <= 0) {
    throw new Error(errorMessage)
  }

  account.valor = parseInt(valorOperation)

  account = await repoUpdateBalance(account)

  account = await verifyIfAccountExists(account, false)

  return account
}

const validateAccountWithValue = (account) => {
  const { valor } = account
  return (
    validateAccountWithoutValue(account) &&
    validation.validateNumberField(valor, 'Valor')
  )
}

const validateAccountWithoutValue = (account) => {
  const { agencia, conta } = account

  return (
    validation.validateNumberField(agencia, 'Agência') &&
    validation.validateNumberField(conta, 'Conta')
  )
}

const verifyIfAccountExists = async (account, searchInDb) => {
  if (searchInDb === true) {
    account = await repoSearchAccount(account)
  }

  if (account === null) {
    throw new Error('Agência/conta inválida.')
  }

  return account
}
