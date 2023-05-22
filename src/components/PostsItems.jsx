import React, { useEffect, useState } from 'react'
import Loader from '../UI/loader/Loader'
import PostItem from './PostItem'
import PostForm from './PostForm'
import PostFilter from './PostFilter'
import MyModal from '../UI/modal/MyModal'
import MyButton from '../UI/button/MyButton'
import { usePosts } from '../hooks/usePost'
import PostService from '../API/PostService'
import { useFetching } from '../hooks/useFetching'

const PostsItems = () => {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query) // custom hook
  const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
    // custom hook
    const posts = await PostService.getAll()
    setPosts(posts)
  })

  useEffect(() => {
    fetchPosts()
  }, [])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const deletePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id))
  }

  return (
    <div>
      <MyButton style={{ width: '50%' }} onClick={() => setModal(true)}>
        Create Post
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr color="teal" size="1" style={{ margin: '15px 0' }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      <hr color="teal" size="1" style={{ margin: '15px 0', width: '75%' }} />
      {postError && <h1>{postError}</h1>}
      {isPostLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '50px 0',
          }}
        >
          <Loader />
        </div>
      ) : (
        <PostItem
          deletePost={deletePost}
          posts={sortedAndSearchedPosts}
          title="List"
        />
      )}
    </div>
  )
}

export default PostsItems
