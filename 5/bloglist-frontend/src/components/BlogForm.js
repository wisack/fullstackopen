import { useState } from 'react'

const BlogForm = ({ blogCreate } ) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')


  const addBlog = async (event) => {
    event.preventDefault()
    const newObject = {
      title: title,
      author: author,
      url: url,
      likes: likes
    }
    await blogCreate(newObject)
    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title
        <input
          id='title'
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
          placeholder='title'
        />
      </div>
      <div>
        author
        <input
          id='author'
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
          placeholder='author'
        />
      </div>
      <div>
        url
        <input
          id='url'
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
          placeholder='url'
        />
      </div>
      <div>
        likes
        <input
          id='likes'
          type="number"
          value={likes}
          name="Likes"
          onChange={({ target }) => setLikes(target.value)}
          placeholder='likes'
        />
      </div>
      <button type="submit" id='add-button'>add</button>
    </form>
  )
}
export default BlogForm