import React from 'react'
import './EndScreen.css'
const EndScreen = ({retry,score}) => {
  return (
    <div className='gameOver'>
      <h1>You Fail</h1>
      <h2>Your Score <span>{score}</span></h2>
      <button onClick={retry}>Try Again</button>
    </div>
  )
}

export default EndScreen