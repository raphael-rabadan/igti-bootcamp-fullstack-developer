import React, { useState, useEffect } from 'react'

import CountryList from './components/Countries/CountryList'

import css from './app.module.css'
import { getTotalPopulation } from './helpers/reduce-helpers'
import { formatNumber } from './helpers/format-helpers'

export default function App() {
  const [allCountries, setAllCountries] = useState([])
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [countryCount, setCountryCount] = useState(0)
  const [totalPopulation, setTotalPopulation] = useState(0)
  const [formattedPopulation, setFormattedPopulation] = useState(0)

  useEffect(() => {
    const fetchCountries = async () => {
      const res = await fetch('https://restcountries.eu/rest/v2/all')
      const json = await res.json()

      const countries = json.map((item) => {
        const { name, flag, numericCode, population, area } = item

        return {
          id: numericCode,
          nameFilter: name.toLowerCase(),
          name,
          flag,
          population,
          area,
        }
      })

      const calculatedPopulation = getTotalPopulation(countries)

      setAllCountries(countries)
      setCountries(Object.assign([], countries))
      setCountryCount(countries.length)
      setTotalPopulation(calculatedPopulation)
      setFormattedPopulation(formatNumber(calculatedPopulation))
    }

    fetchCountries()

    return () => {
      console.log('ok')
    }
  }, [])

  const handleFilter = (event) => {
    const filterText = event.target.value
    const filterTextLowerCase = filterText.toLowerCase()

    setFilter(filterText)

    const countriesFiltered = allCountries.filter((country) => {
      return country.nameFilter.includes(filterTextLowerCase)
    })

    setCountries(countriesFiltered)
    setCountryCount(countriesFiltered.length)
    setTotalPopulation(getTotalPopulation(countriesFiltered))
    setFormattedPopulation(formatNumber(totalPopulation))
  }

  //const { countries, filter, countryCount, formattedPopulation } = this.state

  return (
    <div className={css.mainContainer}>
      <div className={css.flexRow}>
        <div className="input-field">
          <input
            placeholder="Filtro"
            type="text"
            value={filter}
            onChange={handleFilter}
          />
        </div>

        <div className={css.leftRightSpace}>
          | Quantidade de países: <strong>{countryCount}</strong>
        </div>

        <div className={css.leftRightSpace}>
          | População total: <strong>{formattedPopulation}</strong>
        </div>
      </div>
      <hr />
      <div>
        <CountryList data={countries} />
      </div>
    </div>
  )
}
