import { promises as fs } from "fs"

const { readFile, writeFile } = fs
const times = []

init()

async function init() {
    try {
        const jogos2003 = JSON.parse(await readFile("./jogos/2003/2003.json"))

        //inicializar array de times
        jogos2003[0].partidas.forEach((partida) => {
            times.push({ time: partida.mandante, pontuacao: 0 })
            times.push({ time: partida.visitante, pontuacao: 0 })
        })

        //preencher a pontuacao dos times no array
        jogos2003.forEach((rodada) => {
            rodada.partidas.forEach((partida) => {
                const timeMandante = times.find(
                    (item) => partida.mandante === item.time
                )

                const timeVisitante = times.find(
                    (item) => partida.visitante === item.time
                )

                if (partida.placar_mandante > partida.placar_visitante) {
                    timeMandante.pontuacao += 3
                } else if (partida.placar_visitante > partida.placar_mandante) {
                    timeVisitante.pontuacao += 3
                } else {
                    timeMandante.pontuacao += 1
                    timeVisitante.pontuacao += 1
                }
            })
        })

        times.sort((a, b) => b.pontuacao - a.pontuacao)

        await writeFile(
            "./jogos/resultados/times2003.json",
            JSON.stringify(times, null, 2)
        )

        await writeFile(
            "./jogos/resultados/times2003_primeiros4.json",
            JSON.stringify(times.slice(0, 4), null, 2)
        )

        console.log(times)

        const array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        array.forEach(async (num) => {
            //console.log(await teste(num))
        })

        for (let i = 0; i < array.length; i++) {
            console.log(await teste(array[i]))
        }

        console.log("oi")
    } catch (err) {
        console.log(err)
    }

    function teste(number) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(number)
            }, Math.random() * 1000)
        })
    }
}
