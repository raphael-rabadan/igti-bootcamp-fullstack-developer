import React from 'react'

const STARTS = {
  full: '★',
  empty: '☆',
  max: 10,
}

export default function Popularity({ value }) {
  const fullStars = `${STARTS.full.repeat(value)}`
  const empytStars = `${STARTS.empty.repeat(STARTS.max - value)}`

  return (
    <div style={{ fontSize: '1.5rem', color: '#f39c12' }}>
      {fullStars}
      {empytStars}
    </div>
  )
}
