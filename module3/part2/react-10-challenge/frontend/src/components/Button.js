import React from 'react'
import './styles.css'

export default function Button({ value, onButtonClick, type, selected }) {
  const handleOnButtonClick = () => {
    onButtonClick(value, type)
  }

  let cssSelector = type === 'month' ? styles.month : styles.year
  if (value === selected) {
    cssSelector = styles.selected
  }

  return (
    <button
      className='waves effect waves-lights btn'
      style={cssSelector}
      onClick={handleOnButtonClick}
    >
      {value}
    </button>
  )
}

const styles = {
  month: {
    backgroundColor: '#e57373',
    margin: '7px',
    width: '60px',
  },
  year: {
    backgroundColor: '#64b5f6',
    margin: '7px',
    width: '60px',
  },
  selected: {
    backgroundColor: '#4e342e',
    margin: '7px',
    width: '60px',
  },
}
