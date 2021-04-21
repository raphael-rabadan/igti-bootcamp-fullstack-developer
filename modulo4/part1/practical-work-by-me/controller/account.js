import validation from '../helper/validation.js'
import {
  updateBalance as repoUpdateBalance,
  searchAccount as repoSearchAccount,
} from './../repository/account.js'

export const doDeposit = async (account) => {
  return updateBalance(account, 'deposit')
}

export const doWithdraw = async (account) => {
  return updateBalance(account, 'withdraw')
}

const updateBalance = async (account, type) => {
  const { agencia, conta, valor } = account

  validation.validateStringField(agencia, 'Agência')
  validation.validateStringField(conta, 'Conta')
  validation.validateNumberField(valor, 'Valor')

  const operations = ['deposit', 'withdraw']

  if (operations.indexOf(type) === -1) {
    throw new Error('Operação inválida.')
  }

  let valorOperation = parseInt(valor)
  let errorMessage = 'O valor a ser depositado precisa ser positivo.'
  if (type === 'withdraw') {
    valorOperation = parseInt(valor) * -1
    errorMessage = 'O valor a ser sacado precisa ser positivo.'
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
