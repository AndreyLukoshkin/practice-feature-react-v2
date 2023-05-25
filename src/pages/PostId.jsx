import React, { useEffect, useState } from 'react'
import Loader from '../UI/loader/Loader'
import { useParams } from 'react-router-dom'
import { useFetching } from '../hooks/useFetching'
import PostService from '../API/PostService'

const PostId = () => {
  const params = useParams()
  const [postId, setPostId] = useState('')
  const [comments, setComments] = useState([])

  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id)
    setPostId(response.data)
  })

  const [fetchComments, isCommentsLoading, commentsError] = useFetching(
    async (id) => {
      const response = await PostService.getCommentsById(id)
      setComments(response.data)
    }
  )

  useEffect(() => {
    fetchPostById(params.id)
    fetchComments(params.id)
  }, [])

  return (
    <div>
      <h1>You open post with ID {params.id}</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {postId.id}. {postId.title}
        </div>
      )}
      <br />
      <h2>Comments</h2>
      <div>
        {isCommentsLoading ? (
          <Loader />
        ) : (
          comments.map((comment, i) => (
            <div key={i + 1} style={{ margin: '20px 0' }}>
              <strong>{comment.email}</strong>
              <div>{comment.body}</div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default PostId
