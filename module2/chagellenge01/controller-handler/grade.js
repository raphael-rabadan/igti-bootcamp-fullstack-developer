import { promises as fs } from "fs"

const { readFile, writeFile } = fs

const create = async (req, res, next) => {
    try {
        let grade = req.body

        const data = JSON.parse(await readFile(GRADES_FILE))
        const { student, subject, type, value } = grade
        grade = {
            id: data.nextId++,
            student,
            subject,
            type,
            value,
            timestamp: new Date(),
        }

        data.grades.push(grade)

        await writeFile(GRADES_FILE, JSON.stringify(data, null, 2))
        res.send(grade)

        logger.info(`POST /grade - ${JSON.stringify(grade)}`)
    } catch (err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        let grade = req.body

        const data = JSON.parse(await readFile(GRADES_FILE))

        const index = data.grades.findIndex(
            (cur) => parseInt(grade.id) === cur.id
        )

        if (index === -1) {
            throw new Error("Register not found.")
        }

        const { id, student, subject, type, value } = grade
        data.grades[index] = {
            id,
            student,
            subject,
            type,
            value,
            timestamp: data.grades[index].timestamp,
        }

        await writeFile(GRADES_FILE, JSON.stringify(data, null, 2))
        res.send(data.grades[index])

        logger.info(`PUT /grade - ${JSON.stringify(data.grades[index])}`)
    } catch (err) {
        console.log(err)
        next(err)
    }
}

const updateValue = async (req, res, next) => {
    try {
        let grade = req.body

        if (grade.value === undefined || grade.value === null || !grade.id) {
            throw new Error("id e value are mandatory.")
        }

        const data = JSON.parse(await readFile(GRADES_FILE))

        const index = data.grades.findIndex(
            (cur) => parseInt(grade.id) === cur.id
        )

        if (index === -1) {
            throw new Error("Register not found.")
        }

        const { value } = grade
        data.grades[index].value = value

        await writeFile(GRADES_FILE, JSON.stringify(data, null, 2))

        res.send(data.grades[index])

        logger.info(
            `PATCH /grade/value - ${JSON.stringify(data.grades[index])}`
        )
    } catch (err) {
        console.log(err)
        next(err)
    }
}

const exclude = async (req, res, next) => {
    try {
        const idDelete = req.params.id

        const data = JSON.parse(await readFile(GRADES_FILE))
        data.grades = data.grades.filter(
            (grade) => grade.id !== parseInt(idDelete)
        )

        await writeFile(GRADES_FILE, JSON.stringify(data, null, 2))
        res.end()

        logger.info(`DELETE /grade/:id - ${req.params.id}`)
    } catch (err) {
        next(err)
    }
}

const average = async (req, res, next) => {
    try {
        let grade = req.body

        const data = JSON.parse(await readFile(GRADES_FILE))

        const { type, subject } = grade

        const gradeAvg = {
            total: 0,
            count: 0,

            getAvg: function () {
                return this.total === 0 || this.count === 0
                    ? 0
                    : this.total / this.count
            },
        }
        data.grades.forEach((cur) => {
            if (
                cur.type.toLocaleLowerCase() === type.toLocaleLowerCase() &&
                cur.subject.toLocaleLowerCase() === subject.toLocaleLowerCase()
            ) {
                gradeAvg.total += parseInt(cur.value)
                gradeAvg.count++
            }
        })

        res.send(gradeAvg.getAvg().toString())

        logger.info(
            `GET /grade/average - total: ${gradeAvg.total.toString()} count: ${gradeAvg.count.toString()} average: ${gradeAvg
                .getAvg()
                .toString()}`
        )
    } catch (err) {
        next(err)
    }
}

const total = async (req, res, next) => {
    try {
        let grade = req.body

        const data = JSON.parse(await readFile(GRADES_FILE))

        const { student, subject } = grade

        let total = 0
        data.grades.forEach((cur) => {
            if (
                cur.student.toLocaleLowerCase() ===
                    grade.student.toLocaleLowerCase() &&
                cur.subject.toLocaleLowerCase() ===
                    grade.subject.toLocaleLowerCase()
            ) {
                total += parseInt(cur.value)
            }
        })

        res.send(total.toString())

        logger.info(`GET /grade/total - ${total}`)
    } catch (err) {
        next(err)
    }
}

const bests = async (req, res, next) => {
    try {
        let grade = req.body

        const data = JSON.parse(await readFile(GRADES_FILE))

        const { type, subject } = grade

        const grades = data.grades
            .filter((cur) => {
                return (
                    cur.type.toLocaleLowerCase() === type.toLocaleLowerCase() &&
                    cur.subject.toLocaleLowerCase() ===
                        subject.toLocaleLowerCase()
                )
            })
            .sort((a, b) => b.value - a.value)
            .slice(0, 3)

        res.send(grades)

        logger.info(`GET /grade/bests -  ${JSON.stringify(grades)}`)
    } catch (err) {
        console.log(err)
        next(err)
    }
}

const searchById = async (req, res, next) => {
    try {
        console.log(req.url)
        const id = req.params.id

        const data = JSON.parse(await readFile(GRADES_FILE))
        const grade = data.grades.find((grade) => grade.id === parseInt(id))

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
