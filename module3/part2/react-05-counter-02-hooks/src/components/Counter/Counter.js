import React, { Component } from "react"
import css from "./counter.module.css"
import DecrementButton from "./DecrementButton"
import IncrementButton from "./IncrementButton"
import Steps from "./Steps"
import Value from "./Value"

export default class Counter extends Component {
  constructor() {
    super()

    this.state = {
      currentCounter: 2,
      steps: 0,
    }
  }

  handleButtonClick = (clickType) => {
    const { currentCounter, steps } = this.state
    this.setState(
      {
        currentCounter:
          clickType === "+" ? currentCounter + 1 : currentCounter - 1,
        steps: steps + 1,
      },
      () => {
        const { currentCounter, steps } = this.state
        console.log(
          `state updated with steps ${steps} and currentCounter ${currentCounter}`
        )
      }
    )
  }

  render() {
    const { currentCounter, steps } = this.state

    return (
      <div className={css.counterContainer}>
        <DecrementButton onDecrement={this.handleButtonClick}></DecrementButton>
        <Value value={currentCounter}></Value>
        <IncrementButton onIncrement={this.handleButtonClick}></IncrementButton>
        <Steps current={steps}></Steps>
      </div>
    )
  }
}
