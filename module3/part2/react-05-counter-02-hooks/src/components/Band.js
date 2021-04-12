import React, { Component, useState } from 'react'

const BAND_MEMBERS = [
  {
    id: 1,
    name: 'Neil Peart',
    instrument: 'Battery',
  },
  {
    id: 2,
    name: 'Alex Lifeson',
    instrument: 'Guitar',
  },
  {
    id: 3,
    name: 'Neil Peart',
    instrument: 'Bass',
  },
]

export default function Band() {
  const [bandMembers, setBandMembers] = useState(BAND_MEMBERS)
  const [bandName, setBandName] = useState('Rush')

  return (
    <div>
      <h5>{bandName}</h5>
      <ul>
        {bandMembers.map(({ id, name, instrument }) => {
          return (
            <li key={id}>
              {name} - {instrument}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
