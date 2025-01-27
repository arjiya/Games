import { useState } from 'react'
import './App.css'
import './components/GameShop.css'
import GameShop from './components/GameShop'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <GameShop/>
    </>
  )
}

export default App
