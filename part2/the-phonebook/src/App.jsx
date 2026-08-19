import { useState } from 'react'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [filter, setFilter] = useState('')

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