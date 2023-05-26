import React, { useEffect, useRef, useState } from 'react'
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
import { useObserver } from '../hooks/useObserver'
import MySelect from '../UI/select/MySelect'

const PostsPagination = () => {
  const [posts, setPosts] = useState([])
  const [modal, setModal] = useState(false)
  const [isBtnVisible, setIsBtnVisible] = useState('btnNotVisible')

  const [filter, setFilter] = useState({ sort: '', query: '' })
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query) // custom hook

  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(1)
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
  }, [page, limit])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const deletePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id))
  }

  const changeVisibleElements = (value) => {
    setLimit(value)
    setPage(1)
    value > 9 ? setIsBtnVisible('btnVisible') : setIsBtnVisible('btnNotVisible')
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
      <MySelect
        value={limit}
        onChange={(value) => changeVisibleElements(value)}
        defaultValue="Elements on page"
        options={[
          { value: 5, name: '5' },
          { value: 10, name: '10' },
          { value: 25, name: '25' },
          { value: 100, name: 'Show all' },
        ]}
      />
      <hr color="teal" size="1" style={{ margin: '15px 0', width: '75%' }} />
      {postError && <h1>{postError}</h1>}
      <PostItem
        deletePost={deletePost}
        posts={sortedAndSearchedPosts}
        title="List"
      />
      {isPostLoading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '50px 0',
          }}
        >
          <Loader />
        </div>
      )}
      <button
        className={isBtnVisible}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        go Up
      </button>
      <Pagination
        setPage={setPage}
        totalPages={totalPages}
        changePage={changePage}
        page={page}
      />
    </div>
  )
}

export default PostsPagination
