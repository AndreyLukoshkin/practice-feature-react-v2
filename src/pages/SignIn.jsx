import React, { useState } from 'react'
import MyInput from '../UI/input/MyInput'
import MyButton from '../UI/button/MyButton'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
  const [valueLogin, setValueLogin] = useState('')
  const [valuePassword, setValuePassword] = useState('')
  const navigate = useNavigate()

  const createAccount = (e) => {
    e.preventDefault()
    navigate('/login')
  }

  return (
    <div style={{ margin: '0 auto', maxWidth: '500px' }}>
      <h1>Registration page, doen't work now</h1>
      <form onSubmit={createAccount}>
        <MyInput
          value={valueLogin}
          onChange={(e) => setValueLogin(e.target.value)}
          type="text"
          placeholder="login"
        />
        <MyInput
          value={valuePassword}
          onChange={(e) => setValuePassword(e.target.value)}
          type="password"
          placeholder="password"
        />
        <MyButton>Create Account</MyButton>
      </form>
    </div>
  )
}

export default SignIn
