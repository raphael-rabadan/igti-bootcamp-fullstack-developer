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

export const deleteAccount = async (account) => {
  const { agencia, conta } = account
  const searchedAccount = await accountModel.findOneAndDelete({
    agencia,
    conta,
  })
  return searchedAccount
}

export const searchAccountsFromAgency = async (account) => {
  const { agencia } = account
  const searchedAccount = await accountModel.find({ agencia })
  return searchedAccount
}

export const getAverageBalanceFromAgency = async (agency) => {
  agency = parseInt(agency)
  const searchedAccount = await accountModel.aggregate([
    {
      $match: {
        agencia: agency,
      },
    },
    {
      $group: {
        _id: '$agencia',
        average: {
          $avg: '$balance',
        },
      },
    },
  ])
  return searchedAccount[0].average
}
