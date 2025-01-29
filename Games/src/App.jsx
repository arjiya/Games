import { useState } from 'react'
import './App.css'
import './components/GameShop.css'
import GameShop from './components/GameShop'
import GameDetails from './components/GameDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <Router>
      <Routes>
        <Route path="/" element={<GameShop />} />
        <Route path="/game/:id" element={<GameDetails />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
