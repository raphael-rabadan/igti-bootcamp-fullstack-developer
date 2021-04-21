import validation from '../helper/validation.js'
import {
  updateBalance as repoUpdateBalance,
  searchAccount as repoSearchAccount,
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

const updateBalance = async (account, type) => {
  const { agencia, conta, valor } = account

  validation.validateStringField(agencia, 'Agência')
  validation.validateStringField(conta, 'Conta')
  validation.validateNumberField(valor, 'Valor')

  if (OPERATIONS.indexOf(type) === -1) {
    throw new Error('Operação inválida.')
  }

  let valorOperation = parseInt(valor)
  let errorMessage = 'O valor a ser depositado precisa ser positivo.'
  if (type === OPERATION_WITHDRAW) {
    valorOperation = parseInt(valor) + TAX_OF_WITHDRAW

    account = await repoSearchAccount(account)

    if (account === null) {
      throw new Error('Agência/conta inválida.')
    }

    console.log(valorOperation)
    console.log(account)
    if (account.balance < valorOperation) {
      throw new Error('Saldo insuficiente.')
    }

    valorOperation *= -1
    errorMessage = 'O valor a ser sacado precisa ser positivo.'

    console.log(account)
  }

  if (parseInt(valor) <= 0) {
    throw new Error(errorMessage)
  }

  account.valor = parseInt(valorOperation)

  account = await repoUpdateBalance(account)

  if (account === null) {
    throw new Error('Agência/conta inválida.')
  }

  return account
}
