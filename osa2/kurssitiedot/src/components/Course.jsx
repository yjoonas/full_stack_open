const Header = ({name}) => {
    return (
        <>
            <h1>
                {name}
            </h1>
        </>
    )
}
const Content = ({parts}) => {
    return (
        <>
            {
                parts.map(part => <Part part={part} key={part.id}></Part> )
            }
        </>
    )
}
const Part = ({part}) => {
    return (
        <>
            <p>
                {part.name} {part.exercises}
            </p>
        </>
    )
}
const Total = ({parts}) => {
    return (
        <>
            <p><strong>Number of exercises {parts.reduce((k, part) => k + part.exercises, 0 )}</strong></p>
        </>
    )
}
const Course = ({course}) => {
    return (
        <>
            <Header name={course.name}></Header>
            <Content parts={course.parts}></Content>
            <Total parts={course.parts}></Total>
        </>
    )
}

export default Course;