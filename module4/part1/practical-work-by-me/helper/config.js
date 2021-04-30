import logger from './logger.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import accountRouter from './../routes/account.js'
import { handlerStatic } from './../handler/static.js'

dotenv.config()

const connectToDatabase = async () => {
  const user = process.env.MONGO_USER
  const pass = process.env.MONGO_PASS
  const db = process.env.MONGO_DB
  const server = process.env.MONGO_SERVER

  const uri = `mongodb+srv://${user}:${pass}@${server}/${db}?retryWrites=true&w=majority`

  const paramsDb = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }

  try {
    console.log(uri)
    await mongoose.connect(uri, paramsDb)
    logger.info(
      `Connected to MongoDB server [${server}] db [${mongoose.connection.db.databaseName}]`
    )
  } catch (error) {
    logger.error('Error connecting to the MongoDB server')
    logger.error(error)
  }
}

const startServer = async () => {
  const API_PORT = process.env.API_PORT

  const app = express()
  app.use(express.json())
  app.use(cors())
  //app.use(handlerStatic, express.static('public'))
  app.use(express.static('public'))
  app.use('/account', accountRouter)

  app.use((err, req, res, next) => {
    logger.error(` ${req.method} ${req.baseUrl} - ${err.message}`)
    res.status(400).send({ error: err.message })
  })

  app.listen(API_PORT, () =>
    logger.info(`API server running at port ${API_PORT}`)
  )
}

export default { connectToDatabase, startServer }
