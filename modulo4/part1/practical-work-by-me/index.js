import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

//import { studentRouter } from './routes/studentRoutes.js'

const app = express()

const user = 'mongouser'
const pass = 'mongopass1234'
const db = 'module4-pratical-work'
const uri = `mongodb+srv://${user}:${pass}@googlecloudbr.abil8.mongodb.net/${db}?retryWrites=true&w=majority`
const paramsDb = { useNewUrlParser: true, useUnifiedTopology: true }

try {
  await mongoose.connect(uri, paramsDb)
  console.log('Connected to MongoDB server')
} catch (error) {
  console.log('Error connecting to the MongoDB server')
}

app.use(express.json())
app.use(cors())
//app.use(studentRouter)

const serverPort = '3030'
app.listen(serverPort, () =>
  console.log(`API server running at port ${serverPort}`)
)
