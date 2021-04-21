import { accountModel } from './../model/account.js'

export const updateBalance = async (account) => {
  const { agencia, conta, valor } = account

  account = await accountModel.findOneAndUpdate(
    { agencia, conta },
    { $inc: { balance: parseInt(valor) } },
    { new: true }
  )

  return account
}

export const searchAccount = async (account) => {
  const { agencia, conta } = account

  const searchedAccount = await accountModel.findOne({ agencia, conta })

  return searchedAccount
}
