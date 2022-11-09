import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const MostVotes = ({anekdootit, votes}) => {

const max = Math.max(...votes)
const index = votes.indexOf(max)

return (
  <p>
    {anekdootit[index]} {<br />} Likes: {max}
  </p>
)}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  
  const Randomizer = () => 
  setSelected(Math.floor(Math.random() * anecdotes.length))

  const Voter = () => {
    const currVotes = [...votes]
    currVotes[selected]++
    setVotes(currVotes)
  }

  return (
    <div>
      <Button handleClick={Randomizer} text="Randomize"/>
      <Button handleClick={Voter} text="Like"/> <br /> 
      <h1>Random quote: </h1>
      <p><u>{anecdotes[selected]}</u></p> <br />
      <p>Likes: {votes[selected]}</p>
      <h2>Most liked anecdote and like count: </h2>  
      <MostVotes anekdootit ={anecdotes} votes={votes}/>
    </div>
  )
}

export default App
