import Togglable from './Togglable'
import { useRef } from 'react'

const Blog = ({ blog, updateLikes}) => {

  const blogRef = useRef()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = (blogId) => {
    updateLikes(blogId)
  }
  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
      </div>
      <Togglable buttonLabel="View" ref={blogRef}>
        <div>
          {blog.url}
        </div>
        <div>
          {blog.likes}<button onClick={() =>addLike(blog._id)}>Like</button>
        </div>
        <div>
          {blog.author}
        </div>
      </Togglable>
    </div>
  )
}

export default Blog