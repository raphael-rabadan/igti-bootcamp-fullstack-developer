import React from "react"

export default function IncrementButton(props) {
  const handleButtonClick = () => {
    props.onIncrement("+")
  }

    return (
      <button
        className="waves-effect waves-light btn green darken-4"
        onClick={handleButtonClick}
      >
        +
      </button>
    )
}
