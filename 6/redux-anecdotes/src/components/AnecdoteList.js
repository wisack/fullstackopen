import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { updateVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const filtering = useSelector(state => state.visibilityFilter).toLowerCase()
    const sortByKey = key => (a, b) => a[key] < b[key] ? 1 : -1
    const anecdotes = useSelector(state => state.anecdotes).slice().sort(sortByKey('votes'))
    const filtered = anecdotes.filter(e => e.content.toLowerCase().includes(filtering))
    const dispatch = useDispatch()

    const vote = (id) => {
      dispatch(updateVote(id))
      const voted = anecdotes.find(e => e.id===id)
      dispatch(setNotification(`you voted ${voted.content}`, 5))
      }

    return (
        <div>
        {filtered.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
        </div>
    )
}

export default AnecdoteList