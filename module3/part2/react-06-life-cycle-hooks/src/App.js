import React, { useEffect, useState } from 'react'
import Toggle from './components/toggle/Toggle'
import Users from './components/users/Users'

export default function App() {
  const [users, setUsers] = useState([])
  const [showUsers, setShowUsers] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(
        'https://randomuser.me/api?seed=rush&nat=en&results=10'
      )
      const json = await res.json()
      setUsers(json.results)
    }

    fetchUsers()

    return () => {
      console.log('Users fetched')
    }
  }, [])

  const handleShowUsers = (isChecked) => {
    setShowUsers(isChecked)
  }

  return (
    <div>
      <h3>React LifeCycle</h3>
      <Toggle
        description='Show users:'
        enabled={showUsers}
        onToggle={handleShowUsers}
      />
      <hr />
      {showUsers ? <Users users={users} /> : 'Turn on!'}
    </div>
  )
}
