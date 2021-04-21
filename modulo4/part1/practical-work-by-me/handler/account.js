import { doDeposit, doWithdraw } from './../controller/account.js'

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
