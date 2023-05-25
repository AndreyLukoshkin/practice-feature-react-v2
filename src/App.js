import './App.css'
import React from 'react'
import AppRouter from './components/AppRouter'
import Navbar from './UI/navbar/Navbar'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <AppRouter />
      </div>
    </BrowserRouter>
  )
}

export default App
