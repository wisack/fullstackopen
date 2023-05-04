import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'
export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)

export const createAnecdote = newNote =>
axios.post(baseUrl, newNote).then(res => res.data)

export const updateVote = updateVote =>
  axios.put(`${baseUrl}/${updateVote.id}`, updateVote).then(res => res.data)