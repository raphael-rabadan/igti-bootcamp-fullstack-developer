import express from 'express'
import {
  handlerGetAccounts,
  handlerDoDeposit,
  handlerDoWithdraw,
} from './../handler/account.js'

const accountRouter = express.Router()

accountRouter.get('/', handlerGetAccounts)
accountRouter.patch('/deposit', handlerDoDeposit)
accountRouter.patch('/withdraw', handlerDoWithdraw)

export default accountRouter
