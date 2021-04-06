import React, { Component } from "react"
import Country from "./Country.js"

export default class Countries extends Component {
  render() {
    const { countries } = this.props

    return (
      <div className="col s4 m3">
        <h2 className="header">Countries</h2>
        {countries.map((country) => {
          return <Country key={country.name} country={country} />
        })}
      </div>
    )
  }
}
