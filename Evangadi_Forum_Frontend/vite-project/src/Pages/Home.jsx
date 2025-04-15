import React, { useContext } from 'react'
import { AppState } from '../App'

function Home() {
  const {user} = useContext(AppState)
  console.log(user)
  return (
    <div>
      <h1>Welcome : {user.username}</h1>
    </div>
  )
}

export default Home
