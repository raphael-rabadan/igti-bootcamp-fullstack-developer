import React from 'react'
import { generateCompetences } from './../helpers/helper.js'

//

export default function Competences({ defaultCompetence, onUpdate }) {
  const updateSelectedCompetence = (event) => {
    onUpdate(event.target.value)
  }

  return (
    <div>
      <select
        onChange={updateSelectedCompetence}
        defaultValue={defaultCompetence}
      >
        {generateCompetences().map(({ month, year }) => {
          const value = `${year}-${month}`
          return (
            <option key={value} value={value}>
              {month}/{year}
            </option>
          )
        })}
      </select>
    </div>
  )
}
