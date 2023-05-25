import React from 'react'
import Posts from '../pages/Posts'
import PostId from '../pages/PostId'
import About from '../pages/About'
import NotFound from '../pages/NotFound'
import { Route, Routes } from 'react-router-dom'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="/" element={<Posts />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/posts/:id" element={<PostId />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRouter
