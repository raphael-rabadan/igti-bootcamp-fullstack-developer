import { promises as fs } from "fs"

const { readFile, writeFile } = fs

start()

async function start() {
    const jogos2003 = readFile("./jogos/2003/2003.json")
        .then((data) => {
            console.log(data)
            readFile("./jogos/2004/2004.json")
                .then((data) => {
                    console.log(data)
                })
                .catch((err) => {
                    console.log(err)
                })
        })
        .catch((err) => {
            console.log(err)
        })
    // console.log(jogos2003[0])

    // const jogos2003 = JSON.parse(await readFile("./jogos/2003/2003.json"))
    // console.log(jogos2003[0])
}
