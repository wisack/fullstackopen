const Header = ({name}) => {
    return <h1>{name}</h1>
  }
  
  const Content = ({parts}) => {
    return (
      <>
        <Part part={parts}></Part>
      </>
    )
  }
  
  const Total = ({course}) => {
    
    const exercises = course.parts.map( part => part.exercises ).reduce( (sum, currentValue) => sum + currentValue )
      return (
          <p><u>{exercises} tasks</u></p>
      )
  }
  
  
  const Part = ({part}) => {
    return (
  <ul>{part.map(coursename => <li key={coursename.id}>{coursename.name} {coursename.exercises}</li>)}</ul>
  )
    }

const Course = ({course}) => {
    return (
      <div>
      <Header name={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total course={course}></Total>
      </div>
    )
  }

  export default Course