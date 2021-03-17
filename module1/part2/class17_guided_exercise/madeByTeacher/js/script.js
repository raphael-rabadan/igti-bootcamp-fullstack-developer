'use strict'

let countriesLeft = []
let countriesRight = []

let globalCountCountries = 0
let globalCountFavorites = 0

let globalTotalPopulationList = 0
let globalTotalPopulationFavorites = 0

let globalTabCountries = null
let globalTabFavorites = null

let globalUlLeft = null
let globalUlRight = null

let numberFormat = null

window.addEventListener("load", () => {
  loadGlobalVariables()
  fetchCountriesAsync()
})

function loadGlobalVariables() {

  countriesLeft = []
  countriesRight = []
  
  globalCountCountries = document.querySelector("#countCountries")
  globalCountFavorites = document.querySelector("#countFavorites")
  
  globalTotalPopulationList = document.querySelector("#totalPopulationList")
  globalTotalPopulationFavorites = document.querySelector("#totalPopulationFavorites")
  
  globalTabCountries = document.querySelector("#tabCountries")
  globalTabFavorites = document.querySelector("#tabFavorites")
  
  globalUlLeft = document.createElement("ul")
  globalUlRight = document.createElement("ul")

  numberFormat = Intl.NumberFormat("pt-BR")
}

async function fetchCountriesAsync() {
  const countries = await fetch("https://restcountries.eu/rest/v2/all")
  const jsonCountries = await countries.json()
  
  countriesLeft = jsonCountries.map(country => {

    const { numericCode, population, translations, flag} = country

    return {
      name: translations.pt,
      flag,
      population,
      formattedPopulation: formatNumber(population),
      id: numericCode
    }
  })  
  renderCountries()
  //console.log(`Erro ao acessar url a [${url}]. Erro retornado [${error}]`)  
}

function renderCountries() {
  console.clear()
  
  renderSummary()
  renderCountryList()
  renderFavorities()
  handleCountryButtons()

  function renderSummary() {
    globalCountCountries.textContent = countriesLeft.length
    globalCountFavorites.textContent = countriesRight.length

    globalTotalPopulationList.textContent = formatNumber(countriesLeft.reduce((acc, cur) => acc += cur.population, 0))
    globalTotalPopulationFavorites.textContent = formatNumber(countriesRight.reduce((acc, cur) => acc += cur.population, 0))
  }

  function renderCountryList() {
    let countriesHTML = "<div>"
    
    countriesLeft.forEach(country => {
      const {name, flag, id, population, formattedPopulation} = country;

      const countryHTML = `
        <div class="country">
          <div>
            <a id="${id}" class="waves-effect waver-light btn">+</a>
          </div>
          <div>
            <img src="${flag}" alt="${name}" />
          </div>
          <div>
            <ul>
              <li>${name}</li>
              <li>(${formattedPopulation})</li>
            <ul>
          </div>
        </div>
      `
      countriesHTML += countryHTML  
      countriesHTML += "</div>"   
    })

    globalTabCountries.innerHTML = countriesHTML
  }

  function renderFavorities() {
    let favoritiesHTML = "<div>"
    
    countriesRight.forEach(favorite => {
      const {name, flag, id, population, formattedPopulation} = favorite;

      const favoriteHTML = `
        <div class="country">
          <div>
            <a id="${id}" class="waves-effect waver-light btn red darken-4">-</a>
          </div>
          <div>
            <img src="${flag}" alt="${name}" />
          </div>
          <div>
            <ul>
              <li>${name}</li>
              <li>(${formattedPopulation})</li>
            <ul>
          </div>
        </div>
      `
      favoritiesHTML += favoriteHTML  
      favoritiesHTML += "</div>"   
    })

    globalTabFavorites.innerHTML = favoritiesHTML
  }

  function handleCountryButtons() {
    const countryButtons = Array.from(globalTabCountries.querySelectorAll(".btn"))
    const favoriteButtons = Array.from(globalTabFavorites.querySelectorAll(".btn"))

    countryButtons.forEach(button => {
      button.addEventListener("click", () => addToFavorites(button.id))
    })

    favoriteButtons.forEach(button => {
      button.addEventListener("click", () => removeFromFavorites(button.id))
    })
  }

  function addToFavorites(id) {
    const countryToAdd = countriesLeft.find(country => country.id === id)
    countriesRight = [...countriesRight, countryToAdd]
    countriesRight.sort((a, b) => {
      return a.name.localeCompare(b.name)
    })

    countriesLeft = countriesLeft.filter(country => country.id !== id)
    renderCountries()
  }

  function removeFromFavorites(id) {
    const countryToRemove = countriesRight.find(country => country.id === id)
    countriesLeft = [...countriesLeft, countryToRemove]
    countriesLeft.sort((a, b) => {
      return a.name.localeCompare(b.name)
    })

    countriesRight = countriesRight.filter(country => country.id !== id)    

    renderCountries()
  }
}

function formatNumber(number) {
  return numberFormat.format(number)
}