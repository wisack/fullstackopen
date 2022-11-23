const BlogForm = ({handleBlog, title, setTitle, author, setAuthor, url, setUrl, likes, setLikes}) => {
    return (
    <form onSubmit={handleBlog}>
    <div>
      title
        <input
        type="text"
        value={title}
        name="Title"
        onChange={({ target }) => setTitle(target.value)}
      />
    </div>
    <div>
      author
        <input
        type="text"
        value={author}
        name="Author"
        onChange={({ target }) => setAuthor(target.value)}
      />
    </div>
    <div>
      url
        <input
        type="url"
        value={url}
        name="Url"
        onChange={({ target }) => setUrl(target.value)}
      />
    </div>
    <div>
      likes
        <input
        type="number"
        value={likes}
        name="Likes"
        onChange={({ target }) => setLikes(target.value)}
      />
    </div>
    <button type="submit">add</button>
  </form> 
    )
}

export default BlogForm