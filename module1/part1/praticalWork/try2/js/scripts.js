window.addEventListener("load", start)

var globalInputRange = document.querySelector("#rangeNumero")
var globalInputNumeroInteiro = document.querySelector("#numeroAtual")
var globalOnputNumeroPorExtenso = document.querySelector("#numeroPorExtenso")

function start() {
  escreverNumeroDecimal()
  escreverNumeroPorExtenso()
}

function escreverNumeroDecimal() {
  globalInputNumeroInteiro.value = globalInputRange.value
  function handleEscreverNumeroDecimal(event) {
    globalInputNumeroInteiro.value = globalInputRange.value
  }
  globalInputRange.addEventListener("change", handleEscreverNumeroDecimal)
}

function escreverNumeroPorExtenso() {
  function calculaNumeroPorExtenso(numero) {
    function calculaUnidade(numeroUnidade) {
      let unidades = ["Zero", "Um", "Dois", "Três", "Quatro", "Cinco", "Seis", "Sete", "Oito", "Nove"]      
      return unidades[parseInt(numeroUnidade)]
    }

    function calculaDezena(numeroDezena) {
      let decimaisUnicos = [];
      decimaisUnicos[10] = "Dez"
      decimaisUnicos[11] = "Onze"
      decimaisUnicos[12] = "Doze"
      decimaisUnicos[13] = "Treze"
      decimaisUnicos[14] = "Catorze"
      decimaisUnicos[15] = "Quinze"
      decimaisUnicos[16] = "Dezesseis"
      decimaisUnicos[17] = "Dezessete"
      decimaisUnicos[18] = "Dezoito"
      decimaisUnicos[19] = "Dezenove"
  
      let decimais = [];
      decimais[2] = "Vinte"
      decimais[3] = "Trinta"
      decimais[4] = "Quarenta"
      decimais[5] = "Cinquenta"
      decimais[6] = "Sessenta"
      decimais[7] = "Setenta"
      decimais[8] = "Oitenta"
      decimais[9] = "Noventa"
            
      let numeroInteger = parseInt(numeroDezena);
      let casaDecimal = numeroDezena.substring(0, 1)
      let unidade = numeroDezena.substring(1, 2)
      if (decimaisUnicos[numeroInteger] !== undefined ) {
        return decimaisUnicos[numeroInteger]
      } else if (numeroInteger % 10 === 0) {
        return decimais[casaDecimal]
      } else {
        return decimais[casaDecimal] + " e " + calculaUnidade(parseInt(unidade))
      }
    }

    function calculaCentena(numeroCentena) {
      let centenas = [];
      centenas[1] = "Centena"      
      centenas[2] = "Duzentos"
      centenas[3] = "Trezentos"
      centenas[4] = "Quatrocentos"
      centenas[5] = "Quinhentos"
      centenas[6] = "Seiscentos"
      centenas[7] = "Setecentos"
      centenas[8] = "Oitocentos"
      centenas[9] = "Novecentos"  

      let centena = numeroCentena.substring(0, 1)
      let dezena = numeroCentena.substring(1, 3)
      
      if (parseInt(numeroCentena) === 100) {
        return "Cem"
      } else {
        let numeroInteger = parseInt(numeroCentena);
        if (numeroInteger % 100 === 0) {
          return centenas[centena]
        } else {
          return centenas[centena] + " e " + calculaDezena(dezena)
        }
      }
    }

    if (numero.length === 1) {
      return calculaUnidade(numero)
    } else if (numero.length === 2) {
      return calculaDezena(numero)
    } else if (numero.length === 3) {
      return calculaCentena(numero)
    } else {
      return "em desenvolvimento"
    }
  }

  function handleEscreveNumeroPorExtenso(event) {
    globalOnputNumeroPorExtenso.value = calculaNumeroPorExtenso(globalInputRange.value)    
  }  

  globalOnputNumeroPorExtenso.value = calculaNumeroPorExtenso(globalInputRange.value)
  globalInputRange.addEventListener("change", handleEscreveNumeroPorExtenso)

}