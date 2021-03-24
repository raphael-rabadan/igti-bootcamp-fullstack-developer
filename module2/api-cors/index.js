import express from "express"

const app = express()
app.use(express.json())
app.use(express.static("public"))

app.listen(3020, async () => {
    console.log("API Started!")
})
