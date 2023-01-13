import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog> tests', () => {

  const mockBlog = {
    'title': 'Test blog',
    'author': 'Testaaja',
    'url': 'https://test.com',
    'likes': 5,
    'user': 'user',
  }

  const loggedUser = {
    id: 0
  }

  const mockLike = jest.fn()
  const mockRemove = jest.fn()
  let blogTest
  beforeEach(() => {
    blogTest = render(<Blog blog={mockBlog} likeBlog={mockLike} loggedUser={loggedUser} removeBlog={mockRemove}/>)
  })

  test('hidden view only title and author visible', () => {
    const hideVisible2 = blogTest.container.querySelector('.hideVisible2')
    expect(hideVisible2).toHaveTextContent(`${mockBlog.title} - ${mockBlog.author}`)
  })

  test('show all info after clicking view', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const showVisible2 = blogTest.container.querySelector('.showVisible2')
    expect(showVisible2).toHaveTextContent(`${mockBlog.title} - ${mockBlog.author} Url: ${mockBlog.url} Likes: ${mockBlog.likes}`)
  })

  test('like handler clicked and called twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)
    expect(mockLike.mock.calls).toHaveLength(2)
  })
})
