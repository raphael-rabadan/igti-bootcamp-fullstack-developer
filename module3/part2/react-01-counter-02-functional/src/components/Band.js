import React, { Component } from "react"

export default class Band extends Component {
  constructor() {
    super()

    this.state = {
      bandName: "Rush",
      bandMembers: [
        {
          id: 1,
          name: "Neil Peart",
          instrument: "Battery",
        },
        {
          id: 2,
          name: "Alex Lifeson",
          instrument: "Guitar",
        },
        {
          id: 3,
          name: "Neil Peart",
          instrument: "Bass",
        },
      ],
    }
  }
  render() {
    const { bandName, bandMembers } = this.state

    return (
      <div>
        <h5>{bandName}</h5>
        <ul>
          {bandMembers.map(({ id, name, instrument }) => {
            return (
              <li key={id}>
                {name} - {instrument}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
