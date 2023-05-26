import React, { useContext, useState } from 'react'
import MyInput from '../UI/input/MyInput'
import MyButton from '../UI/button/MyButton'
import { AuthContext } from '../context/context'
import { useNavigate } from 'react-router-dom'
import { registeredUsers } from '../context/registeredUsers'

const Login = () => {
  const [valueLogin, setValueLogin] = useState('')
  const [valuePassword, setValuePassword] = useState('')
  const navigate = useNavigate()
  const { isAuth, setIsAuth } = useContext(AuthContext)

  const login = (e) => {
    e.preventDefault()
    registeredUsers.map((user) => {
      if (user.login === valueLogin && user.password == valuePassword) {
        localStorage.setItem('auth', 'true')
        setIsAuth(true)
        navigate('postsobserver')
      } else {
        setIsAuth(false)
      }
    })
  }

  return (
    <div style={{ margin: '0 auto', maxWidth: '500px' }}>
      <h1>Login page</h1>
      <p>Login: admin</p>
      <p>Password: 11111</p>
      <form onSubmit={login}>
        <MyInput
          value={valueLogin}
          onChange={(e) => setValueLogin(e.target.value)}
          type="text"
          placeholder="Your login"
        />
        <MyInput
          value={valuePassword}
          onChange={(e) => setValuePassword(e.target.value)}
          type="password"
          placeholder="Your password"
        />
        <MyButton>Enter</MyButton>
      </form>
    </div>
  )
}

export default Login
