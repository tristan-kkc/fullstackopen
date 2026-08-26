import { useState, useEffect } from 'react'

import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState({
    content: null,
    type: 'debug'
  });

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
    const person = persons.find(p => p.name === personObject.name)
    if (person) {
      if (confirm(`${personObject.name} is already added to phonebook, replace the old number with the new one?`)) {
        const changedPerson = {...person, number : personObject.number}

        personService
        .update(person.id, changedPerson)
        .then (returnedPerson => {
          setPersons(persons.map(p => p.id === person.id ? returnedPerson : p))
        })

        .catch(error => {
          alert(`The person '${person.name}' was already deleted from the server`)
          setPersons(persons.filter(p => p.id !== person.id))
        })
      }
      else return
    }

    personService
    .create(personObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
    })
    setMessage({
      content:`Added ${personObject.name}`,
      type: 'success'
    })
    setTimeout(() => {
      setMessage({content: null, type: 'debug'})
    }, 5000)
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
        
      setMessage({
          content:`The person '${person.name}' was already deleted from the server`,
          type: 'error'
        })
        setTimeout(() => {
          setMessage({content: null, type: 'debug'})  
        }, 5000)

        setPersons(persons.filter(p => p.id !== id))
      })
  }
}
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification {...message} />
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