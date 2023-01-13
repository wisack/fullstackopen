import { useState } from 'react'
import PropTypes from 'prop-types'
const Blog = ({ blog, likeBlog, loggedUser, removeBlog }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleBlogLike = async (event) => {
    event.preventDefault()
    const updateObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+1,
      user: blog.user
    }
    const path = blog.id
    await likeBlog(updateObject, path)
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    const path = blog.id
    if (window.confirm(`Do you really want to delete ${blog.title}?`)) {
      await removeBlog(path)
    }
  }


  if (loggedUser.id === blog.user) {
    return (
      <div style={blogStyle}>
        <div style={hideWhenVisible} className="hideVisible1">
          {blog.title} - {blog.author}
          <button onClick={toggleVisibility} id='view-button'>view</button>
        </div>
        <div style={showWhenVisible} className="showVisible1" >
          {blog.title} - {blog.author} <p> Url: {blog.url} </p> <p> Likes: {blog.likes} <button onClick={handleBlogLike} id='like-button'>like</button>
            <button onClick={handleDelete} id='delete-button'>delete</button></p>
          <button onClick={toggleVisibility}>hide</button>
        </div>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} className='hideVisible2'>
        {blog.title} - {blog.author}
        <button onClick={toggleVisibility} id='view-button'>view</button>
      </div>
      <div style={showWhenVisible} className='showVisible2'>
        {blog.title} - {blog.author} <p> Url: {blog.url} </p> <p> Likes: {blog.likes} <button onClick={handleBlogLike} id='like-button'>like</button> </p>
        <button onClick={toggleVisibility}>hide</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  loggedUser: PropTypes.object.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog