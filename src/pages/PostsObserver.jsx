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
import { useObserver, useObserverForButton } from '../hooks/useObserver'

const PostsObserver = () => {
  const [posts, setPosts] = useState([])
  const [modal, setModal] = useState(false)
  const [isBtnVisible, setIsBtnVisible] = useState('btnNotVisible')
  const lastElement = useRef()
  const hrElementHideGoUpButton = useRef()

  const [filter, setFilter] = useState({ sort: '', query: '' })
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(5)
  const [page, setPage] = useState(1)

  const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page)
    setPosts([...posts, ...response.data]) // помещаем данные в конец страницы для бесконечной ленты
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  })

  useObserver(lastElement, page < totalPages, isPostLoading, () => {
    setPage(page + 1)
  })

  useObserverForButton(
    hrElementHideGoUpButton,
    () => {
      setIsBtnVisible('btnVisible btnAbsolute')
    },
    () => {
      setIsBtnVisible('btnNotVisible')
    }
  )

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

  return (
    <div style={{ position: 'relative' }}>
      <MyButton style={{ width: '50%' }} onClick={() => setModal(true)}>
        Create Post
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr color="teal" size="1" style={{ margin: '15px 0' }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      <hr
        ref={hrElementHideGoUpButton}
        color="teal"
        size="1"
        style={{ margin: '15px 0', width: '75%' }}
      />
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
      <div ref={lastElement} style={{ height: '20px', background: 'red' }}>
        Observed Element
      </div>
    </div>
  )
}

export default PostsObserver
