import {
  deleteAccount,
  doDeposit,
  doWithdraw,
  getBalance,
  doTransfer,
  getAverage,
  getPoorestClients,
  getRichestClients,
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
    const data = req.body
    const sourceAccount = data.contaOrigem
    const destinationAccount = data.contaDestino
    const value = data.valor

    const balanceSourceAccount = await doTransfer(
      sourceAccount,
      destinationAccount,
      value
    )

    res.send(balanceSourceAccount.toString())

    logger.info(
      `PATCH /transfer - balance of source account after transfer ${balanceSourceAccount} - initial data of the transfer: ${JSON.stringify(
        data
      )}`
    )
  } catch (err) {
    next(err)
  }
}

export const handlerGetAverage = async (req, res, next) => {
  try {
    const agency = req.params.agency
    const average = await getAverage(parseInt(agency))
    res.send(average.toString())
    logger.info(
      `GET /account/average/:agency - average ${average} of agency ${agency}`
    )
  } catch (err) {
    next(err)
  }
}

export const handlerGetPoorestClients = async (req, res, next) => {
  try {
    const size = req.params.size
    const accounts = await getPoorestClients(parseInt(size))
    res.send(accounts)
    logger.info(
      `GET /account/poorest/:size  - size ${size} -${JSON.stringify(accounts)}`
    )
  } catch (err) {
    next(err)
  }
}

export const handlerGetRichestClients = async (req, res, next) => {
  try {
    const size = req.params.size
    const accounts = await getRichestClients(parseInt(size))
    res.send(accounts)
    logger.info(
      `GET /account/richest/:size - size ${size} - ${JSON.stringify(accounts)}`
    )
  } catch (err) {
    next(err)
  }
}
