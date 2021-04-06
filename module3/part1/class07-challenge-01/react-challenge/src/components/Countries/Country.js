import React, { Component } from "react"
import css from "./country.module.css"
import { formatNumber } from "./../../helpers/formatNumber.js"

export default class Countries extends Component {
  render() {
    const { country } = this.props
    const { name, flag, population } = country

    return (
      <div className="card horizontal " key={name}>
        <div className="card-image">
          <img src={flag} className={css.flag} />
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <p>{name}</p>
            <p>{formatNumber(population)}</p>
          </div>
        </div>
      </div>
    )
  }
}
