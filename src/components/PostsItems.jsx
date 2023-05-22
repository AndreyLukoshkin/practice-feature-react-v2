import React, { useMemo, useState } from 'react'
import PostItem from './PostItem'
import PostForm from './PostForm'
import PostFilter from './PostFilter'
import MyModal from '../UI/modal/MyModal'
import MyButton from '../UI/button/MyButton'

const PostsItems = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'JavaScript',
      body: 'Description',
    },
  ])
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false)

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const deletePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id))
  }

  const sortedPosts = useMemo(() => {
    console.log('ОТРАБОТАЛА ФУНКЦИЯ СОРТИРОВКИ')
    if (filter.sort) {
      return [...posts].sort((a, b) =>
        a[filter.sort].localeCompare(b[filter.sort])
      )
    }
    return posts
  }, [filter.sort, posts])

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(filter.query.toLowerCase())
    )
  }, [filter.query, sortedPosts])

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
      <PostItem
        deletePost={deletePost}
        posts={sortedAndSearchedPosts}
        title="List"
      />
    </div>
  )
}

export default PostsItems
