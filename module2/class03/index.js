import { promises as fs } from "fs"

init()
writeReadJson()

async function init() {
    try {
        await fs.writeFile("teste.txt", "bla bla bla")
        await fs.appendFile("teste.txt", "\nteste append file")
        const data = await fs.readFile("teste.txt", "utf-8")
        console.log(data)
    } catch (err) {
        console.log(err)
    }
}

async function writeReadJson() {
    try {
        const arrayCarros = ["Gol", "Palio", "Uno"]
        const obj = {
            carros: arrayCarros,
        }
        await fs.writeFile("teste.json", JSON.stringify(obj))
        const data = JSON.parse(await fs.readFile("teste.json"))
        console.log(data)
        data.carros.push("Sandero")
        await fs.writeFile("teste.json", JSON.stringify(data))
        console.log(data)
    } catch (err) {
        console.log(err)
    }
}

// Promises sem async await
// fs.writeFile("teste.txt", "bla bla bla")
//     .then(() => {
//         fs.appendFile("teste.txt", "\nteste append file")
//             .then(() => {
//                 fs.readFile("teste.txt", "utf-8")
//                     .then((data) => console.log(data))
//                     .catch((err) => console.log(err))
//             })
//             .catch((err) => console.log(err))
//     })
//     .catch((err) => console.log(err))

//Utilizando callbacks
//import fs from "fs" //Módulo de filesystem. Lê e escreve em arquivos através do node

// console.log("1")
// fs.writeFile("teste.txt", "bla bla bla", function (err) {
//     console.log("2")
//     if (err) {
//         console.log("err")
//     } else {
//         fs.appendFile("teste.txt", "\nteste append file\n", (err) => {
//             fs.readFile("teste.txt", "utf-8", (err, data) => {
//                 if (err) {
//                     console.log(err)
//                 } else {
//                     console.log(data)
//                 }
//             })
//         })
//     }
// })
// console.log("3")

// Utilizando de forma sincrona
// try {
//     console.log("1")
//     fs.writeFileSync("teste.txt", "ble ble ble")
//     console.log("2")
//     const data = fs.readFileSync("teste.txt", "utf-8")
//     console.log(data)
//     console.log("3")
// } catch (err) {
//     console.log(err)
// }
