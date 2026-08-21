import { useState, useEffect } from 'react'
import axios from 'axios'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} setValue={setFilter} />

      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} />
      
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App