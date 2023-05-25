import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__links">
        <Link to="/about" className="link">
          About
        </Link>
        <Link to="/posts" className="link">
          Posts
        </Link>
      </div>
    </div>
  )
}

export default Navbar
