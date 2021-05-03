const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel')

const create = async (req, res) => {
  try {
    const transaction = req.body
    await TransactionModel.create(transaction)
    res.send({ message: 'transaction inserido com sucesso' })
    console.log(`POST /transaction - ${JSON.stringify(transaction)}`)
  } catch (error) {
    console.log(`POST /transaction - ${JSON.stringify(error.message)}`)
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' })
  }
}

const findAll = async (req, res) => {
  const name = req.query.name

  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {}

  try {
    const transactions = await TransactionModel.find(condition)

    console.log(`GET /transaction`)
    res.send(transactions)
  } catch (error) {
    console.log(`GET /transaction - ${JSON.stringify(error.message)}`)
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' })
  }
}
const findByCompetence = async (req, res) => {
  const yearMonth = req.params.yearMonth.split('-')

  try {
    const transactions = await TransactionModel.find({
      year: yearMonth[0],
      month: yearMonth[1],
    })

    console.log(`GET /transaction/byCompetence::yearMonth`)
    res.send(transactions)
  } catch (error) {
    console.log(`GET /transaction - ${JSON.stringify(error.message)}`)
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' })
  }
}

const findOne = async (req, res) => {
  const id = req.params.id

  try {
    const transaction = await TransactionModel.findOne({ _id: id })
    console.log(`GET /transaction - ${id}`)
    res.send(transaction)
  } catch (error) {
    console.log(`GET /transaction - ${JSON.stringify(error.message)}`)
    res.status(500).send({ message: 'Erro ao buscar o transaction id: ' + id })
  }
}

const update = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: 'Dados para atualizacao vazio',
      })
    }

    const id = req.params.id

    await TransactionModel.findOneAndUpdate(
      {
        _id: id,
      },
      { $set: req.body },
      { new: true }
    )

    console.log(`PUT /transaction - ${id} - ${JSON.stringify(req.body)}`)
    res.end()
  } catch (error) {
    console.log(`PUT /transaction - ${JSON.stringify(error.message)}`)
    res
      .status(500)
      .send({ message: 'Erro ao atualizar a transaction id: ' + id })
  }
}

const remove = async (req, res) => {
  const id = req.params.id

  try {
    await TransactionModel.findOneAndDelete({
      _id: id,
    })
    console.log(`DELETE /transaction - ${id}`)
    res.end()
  } catch (error) {
    console.log(`DELETE /transaction - ${JSON.stringify(error.message)}`)
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o transaction id: ' + id })
  }
}

const removeAll = async (req, res) => {
  try {
    await TransactionModel.deleteMany({})
    console.log(`DELETE /transaction`)
    res.end()
  } catch (error) {
    console.log(`DELETE /transaction - ${JSON.stringify(error.message)}`)
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' })
  }
}

module.exports = {
  create,
  findAll,
  findByCompetence,
  findOne,
  update,
  remove,
  removeAll,
}
