import express from "express"

const app = express()
app.use(express.json())

//all
app.all("/testAll", (req, res) => {
    res.send(req.method)
})

//Caracteres especiais
app.get("/teste?", (_req, res) => {
    res.send("/teste?")
})

app.get("/buzz+", (_, res) => {
    res.send("/buzz+")
})

app.get("/one*Blue", (req, res) => {
    res.send("/one*Blue " + req.path)
})

app.post("/test(ing)?", (req, res) => {
    console.log(req.body)
    res.send(`/test(ing)?  [${req.path}]`)
})

app.get(/.*Red$/, (req, res) => {
    res.send(`/.*Red$/
    <br />
    [${req.path}]`)
})

// parametros na rota
app.post("/testParam/:id/:a?", (req, res) => {
    console.log(req.body)
    res.send(`/testParam/:id/:a?  [${req.path}]
    <br /> <br />
    id: ${req.params.id} ||| a: ${req.params.a}
    `)
})

// parametros via query
app.get("/testQuery", (req, res) => {
    res.send(req.query)
})

//Next
app.get(
    "/testMultipleHandlers",
    (_req, _res, next) => {
        console.log("Callback 1")
        next()
    },
    (req, res) => {
        console.log("Callback 2")
        res.send(`/testMultipleHandlers
        <br />
        [${req.path}]`)
        res.end()
    }
)

//nxt com array

const callback1 = (req, res, next) => {
    console.log("Callback 1")
    next()
}

function callback2(req, res, next) {
    console.log("Callback 2")
    next()
}

const callback3 = (req, res, next) => {
    console.log("Callback 3")
    res.send(`/testMultipleHandlersArray
    <br />
    [${req.path}]`)
    res.end()
}

app.get("/testMultipleHandlersArray", [callback1, callback2, callback3])

//route
app.route("/testRoute")
    .get((req, res) => {
        res.send(`/testRoute GET
                <br />
                [${req.path}]`)
    })
    .post((req, res) => {
        res.send(`/testRoute POST
                    <br />
                    [${req.path}]`)
    })
    .delete((req, res) => {
        res.send(`/testRoute DELETE
                <br />
                [${req.path}]`)
    })
app.listen(3010, () => {
    console.log("API Server started!")
})
