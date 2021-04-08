import React from "react"

export default function DecrementButton(props) {
  const handleButtonClick = () => {
    props.onDecrement("-")
  }

    return (
      <button
        className="waves-effect waves-light btn red darken-4"
        onClick={handleButtonClick}
      >
        -
      </button>
    )
}
