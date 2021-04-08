import React from 'react'
import css from './card.module.css'

export default function Card({ children }) {
  const { card } = css
  return <div className={card}>{children}</div>
}
