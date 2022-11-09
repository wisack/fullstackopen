const Header = (props) => {
  return <h1>{props.name}</h1>
}

const Content = (props) => {
  return (
    <>
      <Part part={props.parts[0]}></Part>
      <Part part={props.parts[1]}></Part>
      <Part part={props.parts[2]}></Part>
    </>
  )
}

const Total = (props) => (
  
  <p>Total {props.parts[0].exercises+props.parts[1].exercises+props.parts[2].exercises} exercises</p>
)

const Part = (props) => (
<p>{props.part.name} contains {props.part.exercises} exercises</p>
)

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
