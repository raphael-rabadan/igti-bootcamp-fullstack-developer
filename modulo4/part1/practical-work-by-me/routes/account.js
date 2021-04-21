import express from 'express'
import {
  handlerGetAccounts,
  handlerDoDeposit,
  handlerDoWithdraw,
  handlerGetBalance,
  handlerDelete,
  handlerTransfer,
  handlerGetAverage,
  handlerGetPoorestClients,
} from './../handler/account.js'

const accountRouter = express.Router()

accountRouter.get('/', handlerGetAccounts)
accountRouter.patch('/deposit', handlerDoDeposit)
accountRouter.patch('/withdraw', handlerDoWithdraw)
accountRouter.get('/balance', handlerGetBalance)
accountRouter.delete('/', handlerDelete)
accountRouter.patch('/transfer', handlerTransfer)
accountRouter.get('/average/:agency', handlerGetAverage)
accountRouter.get('/poorest/:size', handlerGetPoorestClients)

export default accountRouter
