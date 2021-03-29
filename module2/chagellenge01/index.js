import express from "express"
import cors from "cors"
import logger from "./utils/logger.js"
import gradeRouter from "./routes/grades.js"

const app = express()
app.use(express.json())
app.use(cors())
app.use("/grade", gradeRouter)

app.listen(3010, async () => {
    logger.info("API Module 02 Challenge Server started!")
})
