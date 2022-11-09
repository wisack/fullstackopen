import { useState } from 'react'


const Statistics = ({good, neutral, bad, all, average, positive}) => {
  if (all === 0) {
    return <p>No feedback given</p>
  }
  else {
  return (
    <table>
    <tbody>
    <StatisticLine text="good" value={good}></StatisticLine>
    <StatisticLine text="neutral" value={neutral}></StatisticLine>
    <StatisticLine text="bad" value={bad}></StatisticLine>
    <StatisticLine text="all" value={all}></StatisticLine>
    <StatisticLine text="average" value={average}></StatisticLine>
    <StatisticLine text="positive" value={positive} percentmark="%"></StatisticLine>
    </tbody>
    </table>
  )
  }
}


const StatisticLine = ({text, value, percentmark}) => {
  return (
    <tr>
      <td>{text}</td><td>{value}</td><td>{percentmark}</td>
    </tr>
  )
}


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good+neutral+bad
  const average = (good - bad) / all
  const positive=good/(all)*100



  return (
    
    <div>
    <h1>Give feedback</h1>
    <Button handleClick={() =>setGood(good+1)} text={"good"}></Button>
    <Button handleClick={() =>setNeutral(neutral+1)} text={"neutral"}></Button>
    <Button handleClick={() =>setBad(bad+1)} text={"bad"}></Button>
    <h2>Statistics</h2>
    <><Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}></Statistics></>
    </div>
  )
}

export default App
