import Togglable from './Togglable'
import { useRef } from 'react'

const Blog = ({ blog }) => {

  const blogRef = useRef()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
          {blog.likes}
        </div>
        <div>
          {blog.author}
        </div>
      </Togglable>
    </div>
  )
}

export default Blog