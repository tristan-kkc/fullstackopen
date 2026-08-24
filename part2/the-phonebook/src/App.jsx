import { useState, useEffect } from 'react'

import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

import personService from './services/person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')

  // fetch initial persons.json from server
  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  const addPerson = (personObject) => {
    // check if name exists if so alert and exit out
    const nameExists = persons.some(person => person.name === personObject.name)
    if (nameExists) return alert(`${personObject.name} is already added to phonebook`)

    personService
    .create(personObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
    })
  }

const deletePerson = id => {
  const person = persons.find(p => p.id === id)

  if (!person) return

  if (window.confirm(`Delete ${person.name}?`)) {
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(error => {
        alert(`The person '${person.name}' was already deleted from the server`)
        setPersons(persons.filter(p => p.id !== id))
      })
  }
}
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} setValue={setFilter} />

      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson}/>
      
      <h2>Numbers</h2>
      <div>
        {personsToShow.map(person =>
          <Person
          key={person.id}
          person={person} 
          deletePerson={() => deletePerson(person.id)}/>
        )}
      </div>
    </div>
  )
}

export default App