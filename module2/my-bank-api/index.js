import express from "express"
import winston from "winston"
import accountsRouter from "./routes/accounts.js"
import { promises as fs } from "fs"
import cors from "cors"
import swaggerUi from "swagger-ui-express"
import { swaggerDocument } from "./doc.js"

const { readFile, writeFile } = fs
const { combine, timestamp, label, printf } = winston.format
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`
})

global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "my-bank-api.log" }),
    ],
    format: combine(
        label({ label: "my-bank-api" }),
        timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
        }),
        myFormat
    ),
})

global.fileName = "accounts.json"

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static("public"))
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use("/account", accountsRouter)

app.listen(3010, async () => {
    try {
        await readFile(global.fileName)
        global.logger.info("API Started!")
    } catch (err) {
        const initialJson = {
            nextId: 1,
            accounts: [],
        }
        writeFile(global.fileName, JSON.stringify(initialJson))
            .then(() => {
                global.logger.info("API Started and file created!")
            })
            .catch((err) => {
                global.logger.error(err)
            })
    }
})
