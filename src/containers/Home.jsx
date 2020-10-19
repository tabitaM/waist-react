import React from 'react'
import { useHistory } from 'react-router-dom'

export default function Home() {
  const navigate = useHistory()
  return (
    <div>
      <h1>Home page</h1>
      <button onClick={() => navigate.push('/login')}>Login</button>
    </div>
  )
}
