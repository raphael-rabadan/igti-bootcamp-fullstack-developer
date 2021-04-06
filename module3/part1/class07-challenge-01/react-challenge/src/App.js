import React, { Component } from "react"
import Countries from "./components/countries/Countries.js"
import Header from "./components/header/Header.js"

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
    const countries = json.map((country) => {
      const { name, flag, population, numericCode } = country
      return {
        id: numericCode,
        name,
        flag,
        population,
      }
    })

    this.setState({
      countries,
      countriesFiltered: countries,
    })
  }

  filterCountries = (countriesFiltered) => {
    this.setState({
      countriesFiltered,
    })
  }

  render() {
    const { countriesFiltered, countries } = this.state

    return (
      <div className="container">
        <Header
          countries={countries}
          countriesFiltered={countriesFiltered}
          onType={this.filterCountries}
        />
        <Countries countries={countriesFiltered} />
      </div>
    )
  }
}
