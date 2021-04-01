import { promises } from "fs"
import moment from "moment"
import calc from "../libs/calculo.js"

const { writeFile, readFile } = promises

async function inserirLancamento(lancamento, tipo) {
  const data = JSON.parse(await readFile(global.FILE_NAME))

  lancamento = { id: data.nextId++, ...lancamento }
  if (tipo === "D") {
    lancamento.valor *= -1
  }
  data.lancamentos.push(lancamento)

  await writeFile(global.FILE_NAME, JSON.stringify(data, null, 2))

  return lancamento
}

async function totalMes(mes) {
  const data = JSON.parse(await readFile(global.FILE_NAME))
  let lancamentos = data.lancamentos.filter((lancamento) => {
    const m = moment(lancamento.data, "DD/MM/YYYY").month() + 1
    return m === mes
  })

  lancamentos = lancamentos.map((lancamento) => {
    return lancamento.valor
  })

  console.log(lancamentos)

  return { total: calc.soma(lancamentos) }
}

export { inserirLancamento, totalMes }
