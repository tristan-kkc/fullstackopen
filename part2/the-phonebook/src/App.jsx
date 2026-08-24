import { useState, useEffect } from 'react'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

import personService from './services/person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')

  // fetch initial persons.json from server
  personService
  .getAll()
  .then(initialPersons => {
    setPersons(initialPersons)
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
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} setValue={setFilter} />

      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson}/>
      
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App