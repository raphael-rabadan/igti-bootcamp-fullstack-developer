import express from "express"

const app = express()

app.get("/", (req, res) => {
    res.send("Hello World GET")
})

app.post("/", (req, res) => {
    const a = 3
    const b = 5
    const result = a + b
    res.send("Resultado: " + result)
})

function soma(a, b) {
    const resultado = a + b
    return resultado
}

app.listen(3010, () => {
    console.log("API Started!!")
})
