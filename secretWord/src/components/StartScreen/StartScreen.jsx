import React from 'react'
import './StartScreen.css'
const StartScreen = ({starGame}) => {
  return (
    <div className='Start'>
        <h1>Secret Word</h1>
        <p>Clique no botão para iniciar</p>
        <button onClick={starGame}>Iniciar</button>
    </div>
  )
}

export default StartScreen