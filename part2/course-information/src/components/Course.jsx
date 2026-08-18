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

const Course = ({ course }) => {
  return (
    <div>
        <Header text={course.name}/>
        <Content parts={course.parts} />
    </div>
  )
}

export default Course