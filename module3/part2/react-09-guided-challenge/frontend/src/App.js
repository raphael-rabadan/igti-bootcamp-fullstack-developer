import React from 'react'
import * as api from './api/apiServices'

export default function App() {
  const testApi = async () => {
    const result = await api.geAllGrades()
    console.log(result)
    return result
  }

  testApi()
  return <div>Olá hooks</div>
}
