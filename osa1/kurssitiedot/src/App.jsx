const Header = (props) => {
    return (
        <>
            <h1>
                {props.course}
            </h1>
        </>
    )
}
const Content = (props) => {
    return (
        <>
            {
            props.parts.map(part => <Part part={part} key={part.name}></Part> )
            }
        </>
    )
}
const Part = (props) => {
    return (
        <>
            <p>
                {props.part.name} {props.part.exercises}
            </p>
        </>
    )
}
const Total = (props) => {
    return (
        <>
        <p>Number of exercises {props.parts.reduce((k, part) => k + part.exercises, 0 )}</p>
        </>
    )
 }

const App = () => {
    const course = 'Half Stack application development'
    const parts = [
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

    return (
        <div>
            <Header course={course}></Header>
            <Content parts={parts}></Content>
            <Total parts={parts}></Total>
        </div>
    )
}

export default App