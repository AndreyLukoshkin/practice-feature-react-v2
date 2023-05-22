import React from 'react'
import Post from './Post'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const PostItem = ({ ...props }) => {
  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '15px' }}>{props.title}</h1>
      {props.posts.length !== 0 ? (
        <TransitionGroup>
          {props.posts.map((post, index) => (
            <CSSTransition key={post.id} timeout={200} classNames="post">
              <Post
                deletePost={props.deletePost}
                number={index + 1}
                post={post}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <p className="emptylist">List is Empty</p>
      )}
    </div>
  )
}

export default PostItem
