import React from 'react'

const Post = ({ ...props }) => {
  return (
    <div className="post__container">
      <div className="post__content">
        <strong>
          {props.number}. {props.post.title}
        </strong>
        <div>{props.post.body}</div>
      </div>
      <div>
        <button
          className="btnPost"
          onClick={() => props.deletePost(props.post)}
        >
          delete
        </button>
      </div>
    </div>
  )
}

export default Post
