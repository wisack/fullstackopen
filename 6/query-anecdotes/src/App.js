import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Content from './components/Content'

const App = () => {

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      <Content />
    </div>
  )
}

export default App
