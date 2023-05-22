import React from 'react'
import Post from './Post'

const PostItem = ({ ...props }) => {
  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '15px' }}>{props.title}</h1>
      {props.posts.length > 0 ? (
        props.posts.map((post, index) => (
          <Post
            deletePost={props.deletePost}
            number={index + 1}
            post={post}
            key={post.id}
          />
        ))
      ) : (
        <p className="emptylist">List is Empty</p>
      )}
    </div>
  )
}

export default PostItem
