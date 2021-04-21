import {
  deleteAccount,
  doDeposit,
  doWithdraw,
  getBalance,
} from './../controller/account.js'

export const handlerGetAccounts = async (req, res) => {
  try {
    res.send('list all the accounts')
  } catch (err) {
    next(err)
  }
}

export const handlerDoDeposit = async (req, res, next) => {
  try {
    const account = req.body
    const accountUpdated = await doDeposit(account)
    res.send(accountUpdated.balance.toString())
    logger.info(`PATCH /account/deposit - ${JSON.stringify(accountUpdated)}`)
  } catch (err) {
    next(err)
  }
}

export const handlerDoWithdraw = async (req, res, next) => {
  try {
    const account = req.body
    const accountUpdated = await doWithdraw(account)
    res.send(accountUpdated.balance.toString())
    logger.info(`PATCH /account/withdraw - ${JSON.stringify(accountUpdated)}`)
  } catch (err) {
    next(err)
  }
}

export const handlerGetBalance = async (req, res, next) => {
  try {
    const account = req.body
    const accountReturned = await getBalance(account)
    res.send(accountReturned.balance.toString())
    logger.info(`GET /account/balance - ${JSON.stringify(accountReturned)}`)
  } catch (err) {
    next(err)
  }
}

export const handlerDelete = async (req, res, next) => {
  try {
    const account = req.body
    const quantityOfAccountFromAgency = await deleteAccount(account)
    res.send(quantityOfAccountFromAgency.toString())
    logger.info(
      `DELETE /account - quantity of accounts at this agency: ${quantityOfAccountFromAgency} - account deleted: ${JSON.stringify(
        account
      )}`
    )
  } catch (err) {
    next(err)
  }
}

export const handlerTransfer = async (req, res, next) => {
  try {
    const accounts = req.body
    const sourceAccount = accounts.contaOrigem
    const destinationAccount = accounts.contaDestino

    //const quantityOfAccountFromAgency = await transfer(account)
    res.send('handlerTransfer')
    logger.info(`PATCH /transfer - ${JSON.stringify(accounts)}`)
  } catch (err) {
    next(err)
  }
}
