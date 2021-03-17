'use strict'

let countriesLeft = []
let countriesRight = []

let globalCountCountries = document.querySelector("#countCountries")
let globalTotalPopulationList = document.querySelector("#totalPopulationList")
let globalTabCountries = document.querySelector("#tabCountries")

let globalCountFavorites = document.querySelector("#countFavorites")
let globalTotalPopulationFavorites = document.querySelector("#totalPopulationFavorites")
let globalTabFavorites = document.querySelector("#tabFavorites")
let globalUlLeft = document.createElement("ul")
let globalUlRight = document.createElement("ul")

window.addEventListener("load", () => {
  loadCountriesList()
})

function loadCountriesList() {
  let url = "https://restcountries.eu/rest/v2/all"
  let listaPaises = fetch(url)
  .then(res => {
    res.json().then(data => {
      let countriesMinified = data.map(pais => {
        return {
          name: pais.name,
          flag: pais.flag,
          population: pais.population,
          id: pais.numericCode
        }
      })
      countriesLeft = countriesMinified
      renderCountries(countriesLeft)
    })
  }).catch(error => {
    console.log(`Erro ao acessar url a [${url}]. Erro retornado [${error}]`)
  })
}

function renderCountries() {
  console.clear()
  globalCountCountries.textContent = countriesLeft.length
  globalCountFavorites.textContent = countriesRight.length

  globalTotalPopulationList.textContent = countriesLeft.reduce((acc, cur) => acc += cur.population, 0)
  globalTotalPopulationFavorites.textContent = countriesRight.reduce((acc, cur) => acc += cur.population, 0)
   
  globalUlLeft = document.createElement("ul") 
  globalTabCountries.appendChild(globalUlLeft) 

  globalUlRight = document.createElement("ul")
  globalTabFavorites.appendChild(globalUlRight) 
  
  countriesLeft = countriesLeft.sort((a, b) => {
    return a.name.localeCompare(b.name)
  } )

  countriesRight = countriesRight.sort((a, b) => {
    return a.name.localeCompare(b.name)
  } )

  countriesLeft.forEach((country, i) => {
    let liCountry = document.createElement("li")
    
    liCountry.classList.add("country")
    globalUlLeft.appendChild(liCountry)  

    let containerDiv = document.createElement("div")
    liCountry.appendChild(containerDiv)

    let buttonCountry = document.createElement("button")
    buttonCountry.textContent = "."
    buttonCountry.classList.add("add")
    containerDiv.appendChild(buttonCountry)
    containerDiv.addEventListener('click', () => {
      countriesLeft = countriesLeft.filter((elemento, index) => {
        if (country.id === elemento.id) {
          countriesRight.push(elemento)          
          return false
        }
        return true
      })
      globalTabCountries.removeChild(globalUlLeft)
      globalTabFavorites.removeChild(globalUlRight)      
      renderCountries()
    })

    let imgCountry = document.createElement("img")
    imgCountry.src = country.flag
    containerDiv.appendChild(imgCountry)

    let spanCountry = document.createElement("span")
    spanCountry.innerHTML = `${country.name} (${country.population})`
    containerDiv.appendChild(spanCountry)
  })

  countriesRight.forEach((country, i) => {
    let liCountry = document.createElement("li")
    
    liCountry.classList.add("country")
    globalUlRight.appendChild(liCountry)  

    let containerDiv = document.createElement("div")
    liCountry.appendChild(containerDiv)

    let buttonCountry = document.createElement("button")
    buttonCountry.textContent = "."
    buttonCountry.classList.add("add")
    containerDiv.appendChild(buttonCountry)
    containerDiv.addEventListener('click', () => {
      countriesRight = countriesRight.filter((elemento, index) => {
        if (country.id === elemento.id) {
          countriesLeft.push(elemento)          
          return false
        }
        return true
      })
      globalTabCountries.removeChild(globalUlLeft)
      globalTabFavorites.removeChild(globalUlRight)      
      renderCountries()
    })    
    

    let imgCountry = document.createElement("img")
    imgCountry.src = country.flag
    containerDiv.appendChild(imgCountry)

    let spanCountry = document.createElement("span")
    spanCountry.innerHTML = `${country.name} (${country.population})`
    containerDiv.appendChild(spanCountry)
  })
  
}