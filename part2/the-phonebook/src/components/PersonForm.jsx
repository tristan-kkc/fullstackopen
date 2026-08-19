import { useState } from 'react'

const PersonForm = ({persons, setPersons}) => {
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
            id: persons.length + 1,
        }

        setPersons(persons.concat(personObject))
        setNewContact({ name: '', number: '' })
    }

    return (
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
    )
}

  export default PersonForm