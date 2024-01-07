import { useState, useEffect } from 'react'
import personsService from "./services/persons.js";
const Person = ({person, handlePersonDelete}) => {
    return(
        <p>
            {person.name} {person.phoneNumber} <button style={{marginLeft: .5 + 'em'}} onClick={() => handlePersonDelete(person)}>delete</button>
        </p>
    )
}
const Persons = ({persons, handlePersonDelete}) => {
    return(
        <>
            {
                persons.map(person => <Person person={person} key={person.name} handlePersonDelete={handlePersonDelete}></Person> )
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
                name: <input type={"text"} value={name} onChange={nameChangeHandler}/>
            </div>
            <div>
                number: <input type={"number"} value={phoneNumber} onChange={numberChangeHandler}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])

    useEffect(() => {
        personsService.getPersons()
            .then(persons => setPersons(persons))
    }, []);

    const [newPerson, setNewPerson] = useState({
        name: '', phoneNumber: ''
    })

    const [search, setSearch] = useState('');

    const addNewPerson = (event) => {
        event.preventDefault();
        if (persons.filter(person => person.name === newPerson.name)?.length > 0 ) {
            if (confirm(`${newPerson.name} is already in notebook. Do you want to update the phone number?`)) {
                const personInNotebook = persons.find(p => p.name === newPerson.name)
                personsService.updatePerson(personInNotebook.id, {...personInNotebook, phoneNumber: newPerson.phoneNumber})
                    .then(updatedPerson => {
                        setPersons(persons.map(p => p.id === updatedPerson.id ? updatedPerson : p))
                        setNewPerson({
                            name: '', phoneNumber: ''
                        })
                    })
            }
        } else {
            personsService.addPerson({...newPerson})
                .then(person => {
                    setPersons(persons.concat(person))
                    setNewPerson({
                        name: '', phoneNumber: ''
                    })
                })
        }
    }

    const removePerson = (person) => {
        if (confirm(`Delete person ${person.name}`))
        personsService.deletePerson(person.id)
            .then(() => {
            setPersons(persons.filter(p => p.id !== person.id))
        })
            .catch(e => {
                console.log(e)
            })
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
     return person.name?.toLowerCase().includes(search.toLowerCase())
         || person.phoneNumber?.toLowerCase().includes(search.toLowerCase())
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
            <Persons persons={shownPersons} handlePersonDelete={removePerson} ></Persons>
        </div>
    )

}

export default App