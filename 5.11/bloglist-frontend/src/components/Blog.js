import Togglable from './Togglable'
import { useRef } from 'react'

const Blog = ({ blog, updateLikes, removeBlog }) => {

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

  const deleteBlog = (blogId, blogname) => {
    removeBlog(blogId, blogname)
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
          {blog.likes}<button onClick={() => addLike(blog._id)}>Like</button>
        </div>
        <div>
          {blog.author}
        </div>
        <div>
          {blog.user.id === JSON.parse(window.localStorage.getItem('loggedUser')).id &&
            <button onClick={() => deleteBlog(blog._id, blog.title)}>Delete</button>
          }
        </div>
      </Togglable>
    </div>
  )
}

export default Blog