import express from 'express'
import {
  handlerGetAccounts,
  handlerDoDeposit,
  handlerDoWithdraw,
  handlerGetBalance,
  handlerDelete,
  handlerTransfer,
} from './../handler/account.js'

const accountRouter = express.Router()

accountRouter.get('/', handlerGetAccounts)
accountRouter.patch('/deposit', handlerDoDeposit)
accountRouter.patch('/withdraw', handlerDoWithdraw)
accountRouter.get('/balance', handlerGetBalance)
accountRouter.delete('/', handlerDelete)
accountRouter.patch('/transfer', handlerTransfer)

export default accountRouter
