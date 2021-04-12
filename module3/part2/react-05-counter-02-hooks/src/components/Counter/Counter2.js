import React from "react"
import css from "./counter.module.css"
import DecrementButton from "./DecrementButton"
import IncrementButton from "./IncrementButton"
import Steps from "./Steps"
import Value from "./Value"

export default function Counter2(props) {

  const handleButtonClick = (clickType) => {
    props.onCount(clickType)
  }

  const { countValue, currentStep } = props

    return (
      <div className={css.counterContainer}>
        <DecrementButton onDecrement={handleButtonClick}></DecrementButton>
        <Value value={countValue}></Value>
        <IncrementButton onIncrement={handleButtonClick}></IncrementButton>
        <Steps current={currentStep}></Steps>
      </div>
    )
}
