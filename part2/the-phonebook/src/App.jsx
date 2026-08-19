import { useState } from 'react'

import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567'}
  ]) 

  const [newContact, setNewContact] = useState({ name: '', number: '' })

const handleChange = (event) => {
  const { name, value } = event.target
  setNewContact({
    ...newContact,
    [name]: value
  })
}



  const addPerson = (event) => {
    event.preventDefault()

    const nameExists = persons.some(person => person.name === newContact.name)

    if (nameExists) return alert(`${newContact.name} is already added to phonebook`)

    const personObject = {
      name: newContact.name,
      number: newContact.number,
    }

    setPersons(persons.concat(personObject))
    setNewContact({ name: '', number: '' })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
          value={newContact.name}
          name='name'
          onChange={handleChange} 
          />
        </div>
        <div>number: <input 
          value={newContact.number}
          name='number'
          onChange={handleChange} 
        />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => 
          <Person key={person.name} person={person} />
        )}
      </div>
    </div>
  )
}

export default App