import express from "express"
import { promises as fs } from "fs"
import cors from "cors"

const { readFile, writeFile } = fs

const router = express.Router()

router.post("/", async (req, res, next) => {
    try {
        let account = req.body

        if (!account.name || account.balance == null) {
            throw new Error("Name e Balance são obrigatórios.")
        }

        const data = JSON.parse(await readFile(global.fileName))
        const { name, balance } = account
        account = {
            id: data.nextId++,
            name,
            balance,
        }
        data.accounts.push(account)

        await writeFile(global.fileName, JSON.stringify(data, null, 4))
        res.send(account)

        logger.info(`POST /account - ${JSON.stringify(account)}`)
    } catch (err) {
        next(err)
    }
})

router.get("/", cors(), async (_req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName))
        delete data.nextId
        res.send(data)

        logger.info(`GET /account`)
    } catch (err) {
        next(err)
    }
})

router.get("/:id", cors(), async (req, res, next) => {
    try {
        const idParaBusca = req.params.id
        const data = JSON.parse(await readFile(global.fileName))
        const account = data.accounts.find(
            (acc) => acc.id === parseInt(idParaBusca)
        )
        res.send(account)
        logger.info(`GET /account:id`)
    } catch (err) {
        next(err)
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        const idParaDelete = req.params.id
        const data = JSON.parse(await readFile(global.fileName))
        data.accounts = data.accounts.filter(
            (acc) => acc.id !== parseInt(idParaDelete)
        )
        await writeFile(global.fileName, JSON.stringify(data, null, 4))
        res.end()
        logger.info(`DELETE /account:id - ${req.params.id}`)
    } catch (err) {
        next(err)
    }
})

router.put("/", async (req, res, next) => {
    try {
        let account = req.body

        if (!account.name || account.balance === null || !account.id) {
            throw new Error("ID, Name e Balance são obrigatórios.")
        }

        const data = JSON.parse(await readFile(global.fileName))

        const index = data.accounts.findIndex(
            (acc) => acc.id === parseInt(account.id)
        )

        if (index === -1) {
            throw new Error("Registro não encontrado.")
        }
        const { name, balance } = account

        data.accounts[index].name = name
        data.accounts[index].balance = balance

        await writeFile(global.fileName, JSON.stringify(data, null, 4))

        res.send(data.accounts[index])

        logger.info(`PUT /account - ${JSON.stringify(account)}`)
    } catch (err) {
        next(err)
    }
})

router.patch("/updateBalance", async (req, res, next) => {
    try {
        let account = req.body

        if (account.balance === null || !account.id) {
            throw new Error("ID e Balance são obrigatórios.")
        }

        const data = JSON.parse(await readFile(global.fileName))

        const index = data.accounts.findIndex(
            (acc) => acc.id === parseInt(account.id)
        )

        if (index === -1) {
            throw new Error("Registro não encontrado.")
        }

        data.accounts[index].balance = account.balance

        await writeFile(global.fileName, JSON.stringify(data, null, 4))

        res.send(data.accounts[index])
        logger.info(`PATCH /account/updateBalance - ${JSON.stringify(account)}`)
    } catch (err) {
        next(err)
    }
})

router.use((err, req, res, next) => {
    logger.error(` ${req.method} ${req.baseUrl} - ${err.message}`)
    res.status(400).send({ error: err.message })
})

export default router
