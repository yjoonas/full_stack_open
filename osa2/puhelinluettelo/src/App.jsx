import { useState } from 'react'

const Person = ({person}) => {
    return(
        <p>
            {person.name} {person.phoneNumber}
        </p>
    )
}

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])

    const [newPerson, setNewPerson] = useState({
        name: '', phoneNumber: ''
    })

    const addNewPerson = (event) => {
        event.preventDefault();
        if (persons.filter(person => person.name === newPerson.name)?.length > 0 ) {
            alert(`${newPerson.name} is already in notebook`)
        } else {
            const newPersons = persons.concat({...newPerson})
            setPersons(newPersons)
            setNewPerson({
                name: '', phoneNumber: ''
            })
        }
    }

    const handleNameChange = (event) => {
        setNewPerson({...newPerson, name: event.target.value})
    }
    const handleNumberChange = (event) => {
        setNewPerson({...newPerson, phoneNumber: event.target.value})
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addNewPerson}>
                <div>
                    name: <input value={newPerson.name} onChange={handleNameChange}/>
                </div>
                <div>
                    number: <input value={newPerson.phoneNumber} onChange={handleNumberChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {
                persons.map(person => <Person person={person} key={person.name}></Person> )
            }
        </div>
    )

}

export default App