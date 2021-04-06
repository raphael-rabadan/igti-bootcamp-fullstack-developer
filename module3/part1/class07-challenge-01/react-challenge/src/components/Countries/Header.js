import React, { Component } from "react"
import { formatNumber } from "./../../helpers/formatNumber.js"

export default class Header extends Component {
  constructor() {
    super()
    // console.log(this.props.countries)
    this.state = {
      countriesFiltered: [],
      totalPopulation: 0,
    }
  }

  filterCountries = (event) => {
    const { countries, onType } = this.props

    const countriesFiltered = countries.filter((country) => {
      return country.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
    })

    onType(countriesFiltered)
  }

  calcultePopulation = () => {
    const { countries } = this.props
    return countries.reduce((acc, cur) => {
      return (acc += cur.population)
    }, 0)
  }

  render() {
    const { countries } = this.props

    return (
      <div className="row">
        <div className="input-field col s2">
          <input id="country" type="text" onChange={this.filterCountries} />
          <label htmlFor="country">Country</label>
        </div>
        <div className="row">
          <div className="card-panel teal lighten-2 col s3">
            Countries: <strong>{countries.length}</strong>
            <br /> Total Population:
            <strong> {formatNumber(this.calcultePopulation())}</strong>
          </div>
        </div>
      </div>
    )
  }
}
