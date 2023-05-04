import { useAnecdoteValue, useAnecdoteDispatch } from "../AnecdoteContext"


const Notification = () => {
  const dispatch = useAnecdoteDispatch()
  const anecdoteValue = useAnecdoteValue()
  setTimeout(() => {
    const action = {type: "NOTIFY", payload: ''}
    dispatch(action)
  }, 5000)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={style}>
      {anecdoteValue !== '' ? anecdoteValue : null}
    </div>
  )
}

export default Notification
