import React from 'react'
import css from './user.module.css'

export default function User({ user }) {
  const { name, picture } = user

  return (
    <div className={css.flexRow}>
      <img src={picture.large} alt={name.first} className={css.avatar}></img>
      <span>{name.first}</span>
    </div>
  )
}
