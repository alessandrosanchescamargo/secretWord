//React
import { useState, useCallback,useEffect } from 'react'

//CSS
import './App.css'

//Componentes
import StartScreen from './components/StartScreen/StartScreen'
import GameScreen from './components/GameScreen/GameScreen'
import EndScreen from './components/EndScreen/EndScreen'

//data
import {wordsList} from './data/words'

//criação dos Stages
const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" }
]

function App() {
  //Criação dos States
  const [gameStage, setGameStage] = useState(stages[0].name) 
  const [words] = useState(wordsList)
  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])
  const [guessedLetters,setGuessedLetters] = useState([])
  const [wrongLetters,setWrongLetters] = useState([])
  const [guesses,setGuesses] = useState(3)
  const [score,setScore] = useState(0)


  //Função para escolher a categoria e escolher a palavra
  const pickedWordAndCategory = useCallback(() => {
    const categories = Object.keys(words)
    //Como escolher uma categoria aleatoriamente
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    //Como escolher uma palavra da categoria escolhida aleatoriamente 
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return {word, category}
  },[words])


  //Função para inicializar o jogo
  const starGame = useCallback(() => {
    clearLetterStates()
   const {word, category} = pickedWordAndCategory()

   //criar um array de plavras
   let wordLetters = word.split("")

  setPickedWord(word)
  setPickedCategory(category)
  setLetters(wordLetters)
  
    
    
    //alterando o Stage
    setGameStage(stages[1].name)


  },[pickedCategory])

  // processar o input de letras
  const verifyLetter = (letter) => {
    //deixar a letra em caxa baixa
   const normalizedLetter = letter.toLowerCase()

   //verifica se a letra já foi escolhida
   if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
    return
   }

   // verifica se a letra pertence a palvra escolhida ou apresenta como errada
   if(letters.includes(normalizedLetter)){
    setGuessedLetters((actualGuessedLetters) => [
      ...actualGuessedLetters,
      normalizedLetter
    ])
   }
   else{
    setWrongLetters((actualWrongLetters) => [
      ...actualWrongLetters,
      normalizedLetter
    ])
    setGuesses((actualGuesses) => actualGuesses -1) 
   }


  }

  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  // game over condition
  useEffect (() =>{
    if(guesses <=0){
      clearLetterStates()
      setGameStage(stages[2].name)

    }
  },[guesses]
  )

  //winner condition
  useEffect(() =>{

    const uniqueLetters = [...new Set(letters)]
    if(guessedLetters.length === uniqueLetters.length){
      setScore((actualScore) => actualScore += 100)
      starGame()
    }


  },[guessedLetters,letters,starGame]
  )

  //reiniciar o jogo
  const retry = () => {
    setScore(0)
    setGuesses(3)
    setGameStage(stages[0].name)
  }

    return (
    <div className="APP">
      {gameStage === 'start' && <StartScreen starGame={starGame}/>}
      {gameStage === 'game' && <GameScreen 
        verifyLetter={verifyLetter} 
        pickedWord={pickedWord} 
        pickedCategory={pickedCategory}
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}
      />}
      {gameStage === 'end' && <EndScreen  retry={retry} score={score}/>}

    </div>
  )
}

export default App
