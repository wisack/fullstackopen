const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const testHelper = require('./test_helper')
const User = require('../models/user')
const bcrypt = require('bcrypt')
  

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', name: 'nimi', passwordHash })

    await user.save()
  })


  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await testHelper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
      blogId: '637ba8e376d13f755c65ac2a'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await testHelper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })


  

test('creation fails with proper statuscode and message if username already taken', async () => {
  const usersAtStart = await testHelper.usersInDb()

  const newUser = {
    username: 'root',
    name: 'Superuser',
    password: 'salainen',
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain('username must be unique')

  const usersAtEnd = await testHelper.usersInDb()
  expect(usersAtEnd).toHaveLength(usersAtStart.length)
})
test('username missing returns 400', async () => {
  const usersAtStart = await testHelper.usersInDb()

  const newUser = {
    name: 'Superuser',
    password: 'salainen',
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain('fill in username')
  const usersAtEnd = await testHelper.usersInDb()
  expect(usersAtEnd).toHaveLength(usersAtStart.length)
})
test('atleast 4 characters password', async () => {
  const usersAtStart = await testHelper.usersInDb()

  const newUser = {
    username: 'Super',
    name: 'nimi',
    password: 'sal',
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain('use atleast 4 characters password')
  const usersAtEnd = await testHelper.usersInDb()
  expect(usersAtEnd).toHaveLength(usersAtStart.length)
})
})

afterAll(() => {
    mongoose.connection.close()
  })