import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import logger from './helper/logger.js'

import accountRouter from './routes/account.js'
import { handlerStatic } from './handler/static.js'

const app = express()

const user = 'mongouser'
const pass = 'mongopass1234'
const db = 'module4-pratical-work'
const uri = `mongodb+srv://${user}:${pass}@googlecloudbr.abil8.mongodb.net/${db}?retryWrites=true&w=majority`
const paramsDb = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}

try {
  await mongoose.connect(uri, paramsDb)
  logger.info('Connected to MongoDB server')
} catch (error) {
  logger.error('Error connecting to the MongoDB server')
}

app.use(express.json())
app.use(cors())
app.use(handlerStatic, express.static('public'))
app.use('/account', accountRouter)

app.use((err, req, res, next) => {
  logger.error(` ${req.method} ${req.baseUrl} - ${err.message}`)
  res.status(400).send({ error: err.message })
})

const serverPort = '3030'
app.listen(serverPort, () =>
  logger.info(`API server running at port ${serverPort}`)
)
