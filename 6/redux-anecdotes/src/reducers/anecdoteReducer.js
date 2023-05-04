import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    incrementVote(state, action) {
      const id = action.payload
      const noteToChange = state.find(n => n.id === id)
      const changedNote = { 
        ...noteToChange, 
        votes: noteToChange.votes+1 
      }
      return state.map(note =>
        note.id !== id ? note : changedNote 
      )
    },
    appendAnecdote(state, action) {
      return [...state, action.payload]
    },
    setInitialState(state, action) {
      return action.payload
    }
  }
})

export const {appendAnecdote,incrementVote, setInitialState} = anecdoteSlice.actions

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await anecdoteService.getAll()
    dispatch(setInitialState(notes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newNote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newNote))
  }
}

export const updateVote = id => {
  return async dispatch => {
    await anecdoteService.updateVote(id)
    dispatch({ type: 'anecdotes/incrementVote', payload: id })
  }
}

export default anecdoteSlice.reducer