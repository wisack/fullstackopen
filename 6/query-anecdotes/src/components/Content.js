import { getAnecdotes, updateVote } from '../requests'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useAnecdoteDispatch } from '../AnecdoteContext'
const Content = () => {
  const dispatch = useAnecdoteDispatch()
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(updateVote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })
  const result = useQuery('anecdotes', getAnecdotes, {retry: 1})
  if ( result.isLoading ) {
    return <div>loading data...</div>
  } else if ( result.isError) {
    return <div>error fetching data</div>
  }

  const anecdotes = result.data

  const handleVote = (anecdote) => {
    const action = {type: "NOTIFY", payload: anecdote.content}
    dispatch(action)
    newAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes+1})
  }


  return (
  <div>
  {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
      <div>
          {anecdote.content}
      </div>
      <div>
          has {anecdote.votes}
          <button onClick={() => handleVote(anecdote)}>vote</button>
      </div>
      </div>
  )}
  </div>
  )
    
}

export default Content