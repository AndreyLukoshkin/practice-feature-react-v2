import React, { useEffect, useState } from 'react'
import Loader from '../UI/loader/Loader'
import PostItem from '../components/PostItem'
import PostForm from '../components/PostForm'
import PostFilter from '../components/PostFilter'
import MyModal from '../UI/modal/MyModal'
import MyButton from '../UI/button/MyButton'
import { usePosts } from '../hooks/usePost'
import PostService from '../API/PostService'
import { useFetching } from '../hooks/useFetching'
import { getPageCount } from '../utils/getPageCount'
import Pagination from '../UI/pagination/Pagination'

const Posts = () => {
  const [posts, setPosts] = useState([])
  const [modal, setModal] = useState(false)

  const [filter, setFilter] = useState({ sort: '', query: '' })
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query) // custom hook

  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(5)
  const [page, setPage] = useState(1)

  const changePage = (page) => {
    if (page === '...') return
    setPage(page)
  }

  const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
    // custom hook
    const response = await PostService.getAll(limit, page)
    setPosts(response.data)
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  })

  useEffect(() => {
    fetchPosts()
  }, [page])

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
      <Pagination
        setPage={setPage}
        totalPages={totalPages}
        changePage={changePage}
        page={page}
      />
    </div>
  )
}

export default Posts
