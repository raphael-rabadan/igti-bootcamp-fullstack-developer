import React, { Component } from "react"
import Countries from "./components/Countries/Countries.js"
import Header from "./components/Countries/Header.js"

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      countries: [],
      countriesFiltered: [],
    }
  }

  async componentDidMount() {
    const res = await fetch("https://restcountries.eu/rest/v2/all")
    const json = await res.json()
    let totalPopulation = 0
    const filteredCountries = json.map((country) => {
      const { name, flag, population } = country
      totalPopulation += population
      return {
        name,
        flag,
        population,
      }
    })

    this.setState({
      countries: filteredCountries,
      countriesFiltered: filteredCountries,
    })
  }

  filterCountries = (countries) => {
    this.setState({
      countriesFiltered: countries,
    })
  }

  render() {
    const { countriesFiltered } = this.state

    return (
      <div className="row">
        <Header countries={countriesFiltered} onType={this.filterCountries} />
        <Countries countries={countriesFiltered} />
      </div>
    )
  }
}
