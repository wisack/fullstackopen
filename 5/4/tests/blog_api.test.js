const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const testHelper = require('./test_helper')
const User = require('../models/user')
  

beforeEach(async () => {
  await Blog.deleteMany({})
  let noteObject = new Blog(testHelper.initialNotes[0])
  await noteObject.save()
  noteObject = new Blog(testHelper.initialNotes[1])
  await noteObject.save()
})

describe('format checks', () => {
  test('notes are returned as json', async () => {
    const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(testHelper.initialNotes.length)
  })

test('object has id field', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})
})

describe('addition operations', () => {
  test('a valid note can be added ', async () => {
    const newNote = {
      title: 'async/await simplifies making async calls',
      author: 'SW',
      url: 'urlikin',
      likes: 5,
    }
  
    await api
      .post('/api/blogs')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const contents = response.body.map(r => r.title)
  
    expect(response.body).toHaveLength(testHelper.initialNotes.length + 1)
    expect(contents).toContain(
      'async/await simplifies making async calls'
    )
  })

  test('likes defaulting to 0 ', async () => {
    const newNote = {
      title: 'async/await simplifies making async calls',
      author: 'SW',
      url: 'urlikin',
    }
    await api
    .post('/api/blogs')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const likes = response.body.map(x => x.likes)
    expect(likes).toContain(0)
})
  test('right status response without title and url', async () => {
    const newNote = {
      author: 'meika vaan',
      likes: 15
    }
    await api
    .post('/api/blogs')
    .send(newNote)
    .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialNotes.length)
})
})


describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const response = await api.get('/api/blogs')
    const noteT = response.body
    const noteToDelete = noteT[0]

    await api
      .delete(`/api/blogs/${noteToDelete.id}`)
      .expect(204)

    const newResponse = await api.get('/api/blogs')
    expect(newResponse.body).toHaveLength(
      testHelper.initialNotes.length - 1
    )

    const contents = newResponse.body
    expect(contents).not.toContain(noteToDelete.content)
  })
})

describe('modification of a blog', () => {
  test('updating likes', async () => {
    const response = await api.get('/api/blogs')
    const blogId = response.body[0].id
    const newNote = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 8,
    }

    await api
    .put(`/api/blogs/${blogId}`)
    .send(newNote)
    .expect(200)

    const newResponse = await api.get('/api/blogs')
    const likes = newResponse.body.map(x => x.likes)
    expect(likes).toContain(8)
  })
})

afterAll(() => {
  mongoose.connection.close()
})