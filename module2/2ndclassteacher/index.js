import express from "express"
import { promises } from "fs"
import cors from "cors"
import routerLancamento from "./routes/lancamentos.js"

const { writeFile } = promises

global.FILE_NAME = "lancamentos.json"

const app = express()
app.use(express.json())
app.use(cors())
app.use("/lancamentos", routerLancamento)

app.listen("3030", async () => {
  try {
    console.log("Server started!")
    const initialJson = {
      nextId: 1,
      lancamentos: [],
    }

    await writeFile(global.FILE_NAME, JSON.stringify(initialJson), {
      flag: "wx",
    })
  } catch (err) {
    // console.log(err)
  }
})
