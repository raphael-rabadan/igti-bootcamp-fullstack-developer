import { promises as fs } from "fs"
import gradeRepository from "../repository/grade.js"

const { readFile, writeFile } = fs

const create = async (req, res, next) => {
    try {
        let grade = req.body
        grade = await gradeRepository.create(grade)
        res.send(grade)
        logger.info(`POST /grade - ${JSON.stringify(grade)}`)
    } catch (err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        let grade = req.body
        const gradeUpdated = await gradeRepository.update(grade)
        res.send(gradeUpdated)
        logger.info(`PUT /grade - ${JSON.stringify(gradeUpdated)}`)
    } catch (err) {
        next(err)
    }
}

const updateValue = async (req, res, next) => {
    try {
        let grade = req.body

        if (grade.value === undefined || grade.value === null || !grade.id) {
            throw new Error("id e value are mandatory.")
        }

        const gradeUpdated = await gradeRepository.updateValue(grade)
        res.send(gradeUpdated)

        logger.info(`PATCH /grade/value - ${JSON.stringify(gradeUpdated)}`)
    } catch (err) {
        console.log(err)
        next(err)
    }
}

const exclude = async (req, res, next) => {
    try {
        await gradeRepository.exclude(req.params.id)
        res.end()
        logger.info(`DELETE /grade/:id - ${req.params.id}`)
    } catch (err) {
        next(err)
    }
}

const average = async (req, res, next) => {
    try {
        let grade = req.body
        const gradeAvgOjb = await gradeRepository.average(grade)
        res.send(gradeAvgOjb.getAvgStr())
        logger.info(
            `GET /grade/average - total: ${gradeAvgOjb.total.toString()} count: ${gradeAvgOjb.count.toString()} average: ${gradeAvgOjb.getAvgStr()}`
        )
    } catch (err) {
        next(err)
    }
}

const total = async (req, res, next) => {
    try {
        let grade = req.body
        const total = await gradeRepository.total(grade)
        res.send(total.toString())
        logger.info(`GET /grade/total - ${total}`)
    } catch (err) {
        next(err)
    }
}

const bests = async (req, res, next) => {
    try {
        let grade = req.body
        const grades = await gradeRepository.bests(grade)
        res.send(grades)
        logger.info(`GET /grade/bests -  ${JSON.stringify(grades)}`)
    } catch (err) {
        console.log(err)
        next(err)
    }
}

const searchById = async (req, res, next) => {
    try {
        const id = req.params.id
        const grade = await gradeRepository.searchById(id)
        res.send(grade)
        logger.info(`GET /grade/:id - ${grade}`)
    } catch (err) {
        next(err)
    }
}

const error = (err, req, res, next) => {
    logger.error(` ${req.method} ${req.baseUrl} - ${err.message}`)
    res.status(400).send({ error: err.message })
}

export default {
    create,
    update,
    updateValue,
    exclude,
    average,
    total,
    bests,
    searchById,
    error,
}
