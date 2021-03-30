import { promises as fs } from "fs"

const { readFile, writeFile } = fs

const create = async (grade) => {
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
    return grade
}

const update = async (grade) => {
    const data = JSON.parse(await readFile(GRADES_FILE))

    const index = data.grades.findIndex((cur) => parseInt(grade.id) === cur.id)

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

    return data.grades[index]
}

const updateValue = async (grade) => {
    const data = JSON.parse(await readFile(GRADES_FILE))

    const index = data.grades.findIndex((cur) => parseInt(grade.id) === cur.id)

    if (index === -1) {
        throw new Error("Register not found.")
    }

    const { value } = grade
    data.grades[index].value = value

    await writeFile(GRADES_FILE, JSON.stringify(data, null, 2))

    return data.grades[index]
}

const exclude = async (id) => {
    const data = JSON.parse(await readFile(GRADES_FILE))
    data.grades = data.grades.filter((grade) => grade.id !== parseInt(id))

    await writeFile(GRADES_FILE, JSON.stringify(data, null, 2))
}

const average = async (grade) => {
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
        getAvgStr: function () {
            return this.getAvg().toString()
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

    return gradeAvg
}

const total = async (grade) => {
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

    return total
}

const bests = async (grade) => {
    const data = JSON.parse(await readFile(GRADES_FILE))

    const { type, subject } = grade

    const grades = data.grades
        .filter((cur) => {
            return (
                cur.type.toLocaleLowerCase() === type.toLocaleLowerCase() &&
                cur.subject.toLocaleLowerCase() === subject.toLocaleLowerCase()
            )
        })
        .sort((a, b) => b.value - a.value)
        .slice(0, 3)

    return grades
}
const searchById = async (id) => {
    const data = JSON.parse(await readFile(GRADES_FILE))
    const grade = data.grades.find((grade) => grade.id === parseInt(id))
    return grade
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
}
