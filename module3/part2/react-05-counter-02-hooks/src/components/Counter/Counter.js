import React, { Component, useState } from 'react'
import css from './counter.module.css'
import DecrementButton from './DecrementButton'
import IncrementButton from './IncrementButton'
import Steps from './Steps'
import Value from './Value'

export default function Counter() {
  const [currentCounter, setCurrentCounter] = useState(2)
  const [steps, setSteps] = useState(0)

  const handleButtonClick = (clickType) => {
    const counter = clickType === '+' ? currentCounter + 1 : currentCounter - 1
    setCurrentCounter(counter)
    setSteps(steps + 1)
  }

  return (
    <div className={css.counterContainer}>
      <DecrementButton onDecrement={handleButtonClick}></DecrementButton>
      <Value value={currentCounter}></Value>
      <IncrementButton onIncrement={handleButtonClick}></IncrementButton>
      <Steps current={steps}></Steps>
    </div>
  )
}
