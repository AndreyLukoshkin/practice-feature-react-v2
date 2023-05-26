import './App.css'
import React, { useEffect, useState } from 'react'
import AppRouter from './components/AppRouter'
import Navbar from './UI/navbar/Navbar'
import { AuthContext } from './context/context'
import { BrowserRouter } from 'react-router-dom'

function App() {
  const [isAuth, setIsAuth] = useState(false)

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
      }}
    >
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <AppRouter />
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
