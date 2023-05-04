import { createAnecdote } from '../requests'
import { useMutation, useQueryClient } from 'react-query'
import { useAnecdoteDispatch } from '../AnecdoteContext'

const AnecdoteForm = () => {
  const dispatch = useAnecdoteDispatch()
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
    onError: () => {
      dispatch({type: 'NOTIFY', payload: 'anecdote must be atleast 5 characters long'})
    }
  })

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const getId = () => (100000 * Math.random()).toFixed(0)
    const action = {type: "NOTIFY", payload: content}
    dispatch(action)
    newAnecdoteMutation.mutate({ content, id: getId(), votes: 0 })
    
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
