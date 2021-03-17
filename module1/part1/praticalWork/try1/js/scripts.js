window.addEventListener("load", start)

var globalInputRange = document.querySelector("#rangeNumero")
var globalInputNumeroInteiro = document.querySelector("#numeroAtual")
var globalOnputNumeroPorExtenso = document.querySelector("#numeroPorExtenso")

function start() {
  escreverNumeroDecimal()
  escreveNumeroPorExtenso()
}

function escreverNumeroDecimal() {
  globalInputNumeroInteiro.value = globalInputRange.value
  function handleEscreverNumeroDecimal(event) {
    globalInputNumeroInteiro.value = globalInputRange.value
  }
  globalInputRange.addEventListener("change", handleEscreverNumeroDecimal)
}

function escreveNumeroPorExtenso() {

  function calculaNumeroPorExtenso(numero) {
    console.clear()
    console.log("Numero atual: " + numero)
    console.log("Tamanho numero: " + numero.length)

    switch (numero) {
      case "100": return "Cem"
      case "200": return "Duzentos"
      case "300": return "Trezentos"
      case "400": return "Quatrocentos"
      case "500": return "Quinhentos"
      case "600": return "Seiscentos"
      case "700": return "Setecentos"
      case "800": return "Oitocentos"
      case "900": return "Novecentos"
    }

    var numeroPorExtenso = "";
    switch (numero.length) {
      case 3: calculaCentena(numero.substring(2, 3))
      case 2: calculaDezena(numero.substring(1, 2))
      case 1: calculaUnidade(numero)
    }

    return numeroPorExtenso

    function calculaUnidade(numeroUnidade) {
      let unidades = ["Zero", "Um", "Dois", "Três", "Quatro", "Cinco", "Seis", "Sete", "Oito", "Nove"]
      let valorPorExtenso = unidades[parseInt(numeroUnidade)]
      console.log("Unidade [" + numeroUnidade + "] = " + valorPorExtenso)
      return valorPorExtenso
    }
    function calculaDezena(numeroDezena) {
      let dezenas = ["Vinte", "Trinta", "Quarenta", "Cinquenta", "Sessenta", "Setenta", "Oitenta", "Noventa"]
      let valorPorExtenso = dezenas[parseInt(numeroDezena)]
      console.log("Dezena [" + numeroDezena + "] = " + valorPorExtenso)
      return valorPorExtenso
    }
    function calculaCentena(numeroCentena) {
      valorPorExtenso = "";
      console.log("Centena [" + numeroCentena + "] = " + valorPorExtenso)
    }
  }
  
  globalOnputNumeroPorExtenso.value = calculaNumeroPorExtenso(globalInputRange.value)
  function handleEscreveNumeroPorExtenso(event) {
    globalOnputNumeroPorExtenso.value = calculaNumeroPorExtenso(globalInputRange.value)    
  }
  globalInputRange.addEventListener("change", handleEscreveNumeroPorExtenso)

}