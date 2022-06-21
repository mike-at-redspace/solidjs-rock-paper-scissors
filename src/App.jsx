import { createSignal, createEffect } from "solid-js";

const App = () => {
  const [userChoice, setUserChoice] = createSignal('...')
  const [computerChoice, setComputerChoice] = createSignal('...')
  const [result, setResult] = createSignal('Pick a move')
  const [isComputerChoosing, setComputerChoosing] = createSignal(false)
  const moves = ['🪨', '🧻', '✂️']

  createEffect(() => {
    {
      if (isComputerChoosing()) {
        setResult('Computer is \'thinking\'...')
        return
      }
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

  const generateComputerChoice = () => {
    const randomChoice = moves[Math.floor(Math.random() * moves.length)]
    setComputerChoosing(
      setTimeout(() => {
        setComputerChoosing(false)
        setComputerChoice(randomChoice)
      }, 1000)
    )
  }

  const handleClick = ({ currentTarget }) => {
    setUserChoice(currentTarget.textContent)
    generateComputerChoice()
  }

  return (
    <div class="wrap">
      <h2>userChoice: {userChoice()}</h2>
      <h2>computerChoice: {computerChoice()}</h2>
      <div class="moves">
        {moves.map((move, index) =>
          <button key={index} onClick={handleClick}>
            {move}
          </button>
        )}
      </div>
      <h2>{result()}</h2>
    </div>
  )
}


export default App;
