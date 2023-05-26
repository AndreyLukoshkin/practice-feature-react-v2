import PostsObserver from '../pages/PostsObserver'
import PostsPagination from '../pages/PostsPagination'
import PostId from '../pages/PostId'
import About from '../pages/About'
import NotFound from '../pages/NotFound'
import Login from '../pages/Login'
import SignIn from '../pages/SignIn'
import { Route, Routes } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/context'

const AppRouter = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext)

  return (
    <div>
      {isAuth ? (
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<PostsObserver />} />
          <Route path="/postsobserver" element={<PostsObserver />} />
          <Route path="/postsobserver/:id" element={<PostId />} />
          <Route path="/postspagination" element={<PostsPagination />} />
          <Route path="/postspagination/:id" element={<PostId />} />
          <Route path="*" element={<NotFound />} />
          <Route path="login" element={<Login />} />
          <Route path="signin" element={<SignIn />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      )}
    </div>
  )
}

export default AppRouter
