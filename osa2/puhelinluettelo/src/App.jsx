import { useState } from 'react'

const Person = ({person}) => {
    return(
        <p>
            {person.name} {person.phoneNumber}
        </p>
    )
}
const Persons = ({persons}) => {
    return(
        <>
            {
                persons.map(person => <Person person={person} key={person.name}></Person> )
            }
        </>
    )
}

const Filter = ({search, searchHandler}) => {
    return (
        <div>
            filter shown numbers with <input value={search} onChange={searchHandler}/>
        </div>
    )
}

const PersonForm = ({submitHandler, name, phoneNumber, nameChangeHandler, numberChangeHandler }) => {
    return (
        <form onSubmit={submitHandler}>
            <div>
                name: <input value={name} onChange={nameChangeHandler}/>
            </div>
            <div>
                number: <input value={phoneNumber} onChange={numberChangeHandler}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', phoneNumber: '040-123456'},
        {name: 'Ada Lovelace', phoneNumber: '39-44-5323523'},
        {name: 'Dan Abramov', phoneNumber: '12-43-234345'},
        {name: 'Mary Poppendieck', phoneNumber: '39-23-6423122'}
    ])

    const [newPerson, setNewPerson] = useState({
        name: '', phoneNumber: ''
    })

    const [search, setSearch] = useState('');

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

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
    }

    const shownPersons = persons.filter(person => {
     return person.name.toLowerCase().includes(search.toLowerCase())
         || person.phoneNumber.toLowerCase().includes(search.toLowerCase())
    })

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter search={search} searchHandler={handleSearchChange}></Filter>
            <h2>add a new</h2>
            <PersonForm
                name={newPerson.name}
                phoneNumber={newPerson.phoneNumber}
                nameChangeHandler={handleNameChange}
                numberChangeHandler={handleNumberChange}
                submitHandler={addNewPerson}></PersonForm>
            <h2>Numbers</h2>
            <Persons persons={shownPersons}></Persons>
        </div>
    )

}

export default App