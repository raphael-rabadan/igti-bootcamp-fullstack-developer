import React, { Component } from "react"
import User from "./User"

export default class Users extends Component {
  componentDidMount() {
    this.interval = setInterval(() => {
      const { secondsVisible } = this.state
      this.setState({
        secondsVisible: secondsVisible + 1,
      })
    }, 1000)
  }
  componentDidUpdate() {}
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  constructor() {
    super()

    this.state = {
      secondsVisible: 0,
    }
    this.interval = null
  }
  render() {
    const { users } = this.props
    const { secondsVisible } = this.state

    return (
      <div>
        <p>Users Component visible for {secondsVisible} seconds</p>
        <ul>
          {users.map((user) => {
            const { login, name, picture } = user
            return (
              <li key={login.uuid}>
                <User user={user} />
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
