import { createSignal, createEffect } from "solid-js";

const App = () => {
  const [userChoice, setUserChoice] = createSignal('...')
  const [computerChoice, setComputerChoice] = createSignal('...')
  const [result, setResult] = createSignal('Pick a move')
  const choices = ['🪨', '🧻', '✂️']

  const handleClick = (value) => {
    setUserChoice(value)
    generateComputerChoice()
  }

  const generateComputerChoice = () => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)]
    setComputerChoice(randomChoice)
  }

  createEffect(() => {
    {
      switch (userChoice() + computerChoice()) {
        case '✂️🧻':
        case '🪨✂️':
        case '🧻🪨':
          setResult('YOU WIN! 🏆')
          break
        case '🧻✂️':
        case '✂️🪨':
        case '🪨🧻':
          setResult('YOU LOSE! 😧')
          break
        case '🪨🪨':
        case '🧻🧻':
        case '✂️✂️':
          setResult('ITS A DRAW! ✌️')
          break
        default:
          setResult('Pick a move')
      }
    }
  })

  return (
    <div>
      <h1>userChoice is: {userChoice()}</h1>
      <h1>computerChoice is: {computerChoice()}</h1>
      {choices.map((choice, index) =>
        <button key={index} onClick={() => handleClick(choice)}>
          {choice()}
        </button>
      )}
      <h1>{result()}</h1>
    </div>
  )
}


export default App;
