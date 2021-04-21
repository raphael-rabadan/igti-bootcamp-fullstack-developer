import validation from '../helper/validation.js'
import {
  updateBalance as repoUpdateBalance,
  searchAccount as repoSearchAccount,
  searchAccountsFromAgency as repoSearchAccountsFromAgency,
  deleteAccount as repoDeleteAccount,
} from './../repository/account.js'

const TAX_OF_WITHDRAW = 1
const OPERATION_DEPOSIT = 'deposit'
const OPERATION_WITHDRAW = 'withdraw'
const OPERATIONS = [OPERATION_DEPOSIT, OPERATION_WITHDRAW]

export const doDeposit = async (account) => {
  return updateBalance(account, OPERATION_DEPOSIT)
}

export const doWithdraw = async (account) => {
  return updateBalance(account, OPERATION_WITHDRAW)
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

const updateBalance = async (account, type) => {
  const { agencia, conta, valor } = account

  validateAccountWithValue(account)

  if (OPERATIONS.indexOf(type) === -1) {
    throw new Error('Operação inválida.')
  }

  let valorOperation = parseInt(valor)
  let errorMessage = 'O valor a ser depositado precisa ser positivo.'
  if (type === OPERATION_WITHDRAW) {
    valorOperation = parseInt(valor) + TAX_OF_WITHDRAW

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
