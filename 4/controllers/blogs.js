const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('users', { username: 1, name: 1})
  response.json(blogs.map(note => note.toJSON()))
  })
  
blogRouter.post('/', async (request, response) => {

  const body = request.body
  const token = request.token
  const decodedToken = token ? jwt.verify(token, process.env.SECRET) : null
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  
  const user = await User.findById(decodedToken.id)
  
  const note = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    users: user.id
  })
  
  const savedNote = await note.save()
  user.blogs = user.blogs.concat(savedNote.id)
  await user.save()
  response.status(201).json(savedNote)
})

blogRouter.delete('/:id', async (request, response) => {
  const blogId = request.params.id
  const blog = await Blog.findById(blogId)
  if (!blog) {
    return response.status(404).json({
      error: `blog with id ${blogId} not found`
    })
  }
  const token = request.token
  const decodedToken = token ? jwt.verify(token, process.env.SECRET) : null
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  if (blog.users.toString() === decodedToken.id.toString()) {
  await Blog.findByIdAndRemove(request.params.id)
  return response.status(204).end()
  } else {
    return response.status(400).json({
      error: 'Unable to remove other user blog entry'
    })
  }
})

blogRouter.put('/:id', async (request, response) => {
  const blog = request.body
  const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  response.status(200).json(updatedNote)
})

  module.exports = blogRouter