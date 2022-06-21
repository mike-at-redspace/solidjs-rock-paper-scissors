import { createSignal, createEffect } from "solid-js";

const App = () => {
  const [userChoice, setUserChoice] = createSignal('...')
  const [computerChoice, setComputerChoice] = createSignal('...')
  const [result, setResult] = createSignal('Pick a move')
  const [isGenerateComputerChoice, setGenerateComputerChoice] = createSignal(false)
  const moves = ['🪨', '🧻', '✂️']

  const handleClick = (value) => {
    setUserChoice(value)
    generateComputerChoice()
  }

  const generateComputerChoice = () => {
    const randomChoice = moves[Math.floor(Math.random() * moves.length)]
    setGenerateComputerChoice(
      setTimeout(() => {
        setGenerateComputerChoice(false)
        setComputerChoice(randomChoice)
      }, 1000)
    )
  }

  createEffect(() => {
    {
      if (isGenerateComputerChoice()) {
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

  return (
    <div class="wrap">
      <h2>userChoice: {userChoice()}</h2>
      <h2>computerChoice: {computerChoice()}</h2>
      <div class="moves">
        {moves.map((move, index) =>
          <button key={index} onClick={() => handleClick(move)}>
            {move}
          </button>
        )}
      </div>
      <h2>{result()}</h2>
    </div>
  )
}


export default App;
