import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm> tests', () => {
  test('blogform calls callback function with proper parameters', async () => {

    const createNote = jest.fn()
    const user = userEvent.setup()
    render(<BlogForm blogCreate={createNote}/>)
    const title = screen.getByPlaceholderText('title')
    const author = screen.getByPlaceholderText('author')
    const url = screen.getByPlaceholderText('url')
    const likes = screen.getByPlaceholderText('likes')
    const sendButton = screen.getByText('add')
    await user.type(title, 'titteli')
    await user.type(author, 'authori')
    await user.type(url, 'http://url.com')
    await user.type(likes, '3')
    await user.click(sendButton)
    expect(createNote.mock.calls).toHaveLength(1)
    expect(createNote.mock.calls[0][0].title).toBe('titteli')
    expect(createNote.mock.calls[0][0].author).toBe('authori')
    expect(createNote.mock.calls[0][0].url).toBe('http://url.com')
    expect(createNote.mock.calls[0][0].likes).toBe('3')

  })
})