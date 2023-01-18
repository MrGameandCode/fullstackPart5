import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [blogname, setBlogname] = useState('')
  const [blogauthor, setBlogauthor] = useState('')
  const [blogurl, setBlogurl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (user !== null) {
      blogService.getAll(user.token).then(blogs =>
        setBlogs(blogs)
      )
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password, })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const createNewBlog = async (event) => {
    event.preventDefault()
    const blog = {
      "title": blogname,
      "author": blogauthor,
      "url": blogurl
    }
    const response = await blogService.createBlog(user.token, blog)
    if (response.title) {
      setMessage(`${response.title} by ${response.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setBlogname('')
      setBlogauthor('')
      setBlogurl('')
      console.log(response)
      blogService.getAll(user.token).then(blogs =>
        setBlogs(blogs)
      )
    } else {
      setErrorMessage(`Error creating blog ${blogname}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  const Notification = ({ message }) => {
    if (!message) {
      return null
    }
    return (
      <div className='success'>
        {message}
      </div>
    )
  }

  const ErrorNotification = ({ message }) => {
    if (!message) {
      return null
    }
    return (
      <div className='error'>
        {message}
      </div>
    )
  }

  const blogsForm = () => (
    <div>
      <p>{user.name} logged in <input type="button" value="logout" onClick={logout} /></p>
      <form onSubmit={createNewBlog}>
        <div>
          title:
          <input
            type="text"
            value={blogname}
            name="Blogname"
            onChange={({ target }) => setBlogname(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={blogauthor}
            name="Blogauthor"
            onChange={({ target }) => setBlogauthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={blogurl}
            name="Blogurl"
            onChange={({ target }) => setBlogurl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message}></Notification>
      <ErrorNotification message={errorMessage}></ErrorNotification>
      {user === null && loginForm()}
      {user !== null && blogsForm()}
    </div>
  )
}

export default App
