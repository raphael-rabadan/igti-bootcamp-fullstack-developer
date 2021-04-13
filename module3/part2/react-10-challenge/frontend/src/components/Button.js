import React from 'react'

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
      className='waves effect waves-lights btn dark-4'
      style={cssSelector}
      onClick={handleOnButtonClick}
    >
      {value}
    </button>
  )
}

const styles = {
  month: {
    backgroundColor: 'red',
    margin: '10px',
  },
  year: {
    backgroundColor: 'blue',
    margin: '10px',
  },
  selected: {
    backgroundColor: 'black',
    margin: '10px',
  },
}
