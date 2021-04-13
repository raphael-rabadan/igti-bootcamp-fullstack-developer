import React from 'react'
import Button from './Button'

export default function ButtonContainer({
  values,
  onButtonClick,
  type,
  selected,
}) {
  const handleOnButtonClick = (data, type) => {
    onButtonClick(data, type)
  }

  return (
    <div className='container center'>
      {values.map((value) => {
        return (
          <Button
            key={value}
            type={type}
            onButtonClick={handleOnButtonClick}
            value={value}
            selected={selected}
          ></Button>
        )
      })}
    </div>
  )
}
