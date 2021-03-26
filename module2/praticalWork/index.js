import { promises as fs2 } from "fs"
import fs from "fs"

const { readFile, writeFile } = fs2
global.fileCities = "./files/Cidades.json"
global.fileStates = "./files/Estados.json"
global.fileCitiesPerStates = ".files/citiesPerState.json"
global.pathStates = "./files/states/"
global.states = []

async function start() {
    try {
        await question1()
        //question2_all()
        question3()
        question4()
        question5()
        question6()
        question7()
        question8()
    } catch (error) {
        console.log(error)
    }
}

async function question1() {
    console.log("Question 1")
    global.states = JSON.parse(await readFile(global.fileStates))
    const cities = JSON.parse(await readFile(global.fileCities))
    global.states.forEach((state) => {
        const citiesPerState = cities.filter((city) => state.ID === city.Estado)
        const fileState = `${global.pathStates}${state.Sigla.toLocaleUpperCase()}.json` //prettier-ignore
        fs.writeFileSync(fileState, JSON.stringify(citiesPerState))
    })
}

function question2(state) {
    const fileState = `${global.pathStates.toLocaleUpperCase()}${state}.json`
    return JSON.parse(fs.readFileSync(fileState)).length
}

function question2_all() {
    global.states.forEach((state) => {
        console.log(`${state.Sigla} ${question2(state.Sigla)}`)
    })
}

function question3() {
    console.log("\nQuestion 3")
    let biggerCities = []
    global.states.sort((a, b) => {
        return question2(b.Sigla) - question2(a.Sigla)
    })
    let total = 0
    global.states.forEach((state, index) => {
        if (index <= 4) {
            biggerCities.push(`${state.Sigla} - ${question2(state.Sigla)}`)
            total += question2(state.Sigla)
        } else {
            return
        }
    })
    console.log(biggerCities)
    console.log(global.states.slice(0, 4))
    console.log(total)
}

function question4() {
    console.log("\nQuestion 4")
    let smallerCities = []
    global.states.reverse()

    let total = 0
    global.states.forEach((state, index) => {
        if (index <= 4) {
            smallerCities.push(`${state.Sigla} - ${question2(state.Sigla)}`)
            total += question2(state.Sigla)
        } else {
            return
        }
    })
    console.log(smallerCities)
    console.log(total)
}

function question5() {
    console.log("\nQuestion 5")
    const biggerCityFromStates = []
    global.states.sort((a, b) => {
        return a.Sigla.localeCompare(b.Sigla)
    })
    global.states.forEach((state) => {
        const fileState = `${global.pathStates}${state.Sigla}.json`
        const citiesFromState = JSON.parse(fs.readFileSync(fileState))

        citiesFromState.sort((a, b) => {
            return b.Nome.length - a.Nome.length
        })

        biggerCityFromStates.push(`${citiesFromState[0].Nome} - ${state.Sigla}`)
    })

    console.log(biggerCityFromStates)
}

function question6() {
    console.log("\nQuestion 6")
    const smallerCityFromStates = []
    global.states.sort((a, b) => {
        return a.Sigla.localeCompare(b.Sigla)
    })
    global.states.forEach((state) => {
        const fileState = `${global.pathStates}${state.Sigla}.json`
        const citiesFromState = JSON.parse(fs.readFileSync(fileState))

        citiesFromState.sort((a, b) => {
            return a.Nome.length - b.Nome.length
        })

        smallerCityFromStates.push(
            `${citiesFromState[0].Nome} - ${state.Sigla}`
        )
    })

    console.log(smallerCityFromStates)
}

function question7() {
    console.log("\nQuestion 7")
    const biggerCityFromStates = []
    global.states.sort((a, b) => {
        return a.Sigla.localeCompare(b.Sigla)
    })
    global.states.forEach((state) => {
        const fileState = `${global.pathStates}${state.Sigla}.json`
        const citiesFromState = JSON.parse(fs.readFileSync(fileState))

        citiesFromState.sort((a, b) => {
            return b.Nome.length - a.Nome.length
        })

        biggerCityFromStates.push(`${citiesFromState[0].Nome} - ${state.Sigla}`)
    })

    biggerCityFromStates.sort((a, b) => {
        return a.length === b.length ? b.localeCompare(a) : b.length - a.length
    })

    console.log(biggerCityFromStates)
}

function question8() {
    console.log("\nQuestion 8")
    const smallerCityFromStates = []
    global.states.sort((a, b) => {
        return a.Sigla.localeCompare(b.Sigla)
    })
    global.states.forEach((state) => {
        const fileState = `${global.pathStates}${state.Sigla}.json`
        const citiesFromState = JSON.parse(fs.readFileSync(fileState))

        citiesFromState.sort((a, b) => {
            return a.Nome.length - b.Nome.length
        })

        smallerCityFromStates.push(
            `${citiesFromState[0].Nome} - ${state.Sigla}`
        )
    })

    smallerCityFromStates.sort((a, b) => {
        return a.length === b.length ? a.localeCompare(b) : a.length - b.length
    })

    console.log(smallerCityFromStates)
}

start()
