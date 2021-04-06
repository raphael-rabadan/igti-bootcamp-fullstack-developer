import React, { Component } from "react"
import Country from "./Country.js"

export default class Countries extends Component {
  render() {
    const { countries } = this.props

    return (
      <div>
        <h2>Countries</h2>
        {countries.map((country) => {
          return <Country key={country.id} country={country} />
        })}
      </div>
    )
  }
}
