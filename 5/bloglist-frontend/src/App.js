import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService
      .getAll().then(initialNotes => {
        setBlogs(initialNotes)
      })
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const blogCreate = async (blogObject) => {
    const { title, author } = blogObject
    try {
      await blogService.create(blogObject)
      blogFormRef.current.toggleVisibility()
      const newBlogs = await blogService.getAll()
      setBlogs(newBlogs)
      setMessage(`Created a new blog ${title} by ${author}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Error creating a blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    blogService.setToken(null)
    setUser(null)
  }

  const likeBlog = async (updateObject, path) => {
    try {
      await blogService.update(path, updateObject)
      const newBlogs = await blogService.getAll()
      setBlogs(newBlogs)
    } catch (exception) {
      setErrorMessage('Error updating likes')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const compareNumbers = (a,b) => {
    return b.likes - a.likes
  }

  const removeBlog = async (path) => {
    try {
      await blogService.remove(path)
      const newBlogs = await blogService.getAll()
      setBlogs(newBlogs)
    } catch (exception) {
      setErrorMessage('Error deleting blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  if (user === null) {
    return (
      <>
        <LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>
        <Notification message={message} errorMessage={errorMessage}/>
      </>
    )
  }
  return (
    <>
      <div>
        <p>{user.name} logged in</p>
        <button onClick={handleLogOut}>log out</button>
      </div>
      <Togglable buttonLabel='create a new blog' ref={blogFormRef}>
        <BlogForm blogCreate={blogCreate}/>
      </Togglable>
      <Notification message={message} errorMessage={errorMessage}/>
      <h2>blogs</h2>
      <div id='list-of-blogs'>
        {blogs.sort(compareNumbers).map(blog => <Blog key={blog.id} blog={blog} likeBlog={likeBlog} loggedUser={user} removeBlog={removeBlog}/>)}
      </div>
    </>
  )
}

export default App
