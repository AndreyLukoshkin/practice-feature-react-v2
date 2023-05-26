import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import MyButtonDelete from '../button/MyButtonDelete'
import { AuthContext } from '../../context/context'

const Navbar = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext)

  const logout = () => {
    localStorage.removeItem('auth')
    setIsAuth(false)
  }

  return (
    <div className="navbar">
      <div className="navbar__links">
        <Link to="about" className="link">
          About
        </Link>
        <Link to="postsobserver" className="link">
          PostsObserver
        </Link>
        <Link to="postspagination" className="link">
          PostsPagination
        </Link>
        <Link to="login" className="link">
          Login
        </Link>
        <Link to="signin" className="link">
          Sign in
        </Link>
      </div>
      {isAuth && (
        <MyButtonDelete onClick={logout} style={{ width: '70px' }}>
          Log out
        </MyButtonDelete>
      )}
    </div>
  )
}

export default Navbar
