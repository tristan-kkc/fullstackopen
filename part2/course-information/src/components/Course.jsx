const Header = ({text}) => <h1>{text}</h1>

const Content = ({parts}) => (
  <div>
    {parts.map(part =>
        <Part key={part.id} part={part} />
    )}
  </div>
)

const Part = ({part}) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Total = ({parts}) => {
    const total = parts.reduce((acc, next) => acc += next.exercises, 0)
    return (
      <p>total of {total} exercises</p>
    )
}

const Course = ({ courses }) => (
  <div>
    {courses.map(course => (
      <div key={course.id}>
        <Header text={course.name}/>
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    ))}
  </div>
)


export default Course