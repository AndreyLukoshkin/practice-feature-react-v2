import MyButtonDelete from '../UI/button/MyButtonDelete'
import { useNavigate } from 'react-router-dom'

const Post = ({ ...props }) => {
  const navigate = useNavigate()

  return (
    <div className="post__container">
      <div className="post__content">
        <strong>
          {props.number}. {props.post.title}
        </strong>
        <div>{props.post.body}</div>
      </div>
      <div className="divid">
        <MyButtonDelete onClick={() => props.deletePost(props.post)}>
          delete
        </MyButtonDelete>
        <MyButtonDelete onClick={() => navigate(`${props.post.id}`)}>
          open
        </MyButtonDelete>
      </div>
    </div>
  )
}

export default Post
