const express = require('express')
const transactionRouter = express.Router()
const controller = require('./../services/transactionService')

transactionRouter.post('/', controller.create)
transactionRouter.get('/', controller.findAll)
transactionRouter.get('/byCompetence/:yearMonth', controller.findByCompetence)
transactionRouter.get('/:id', controller.findOne)
transactionRouter.put('/:id', controller.update)
transactionRouter.delete('/:id', controller.remove)
//transactionRouter.delete('/', controller.removeAll)

module.exports = transactionRouter
