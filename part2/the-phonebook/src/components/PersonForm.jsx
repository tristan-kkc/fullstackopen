import { useState } from 'react'

const PersonForm = ({ addPerson }) => {
    const [newContact, setNewContact] = useState({ name: '', number: '' })

    const handleChange = (event) => {
        const { name, value } = event.target
        setNewContact({
            ...newContact,
            [name]: value
    })
    }

    const handleSubmit = (event) => {
    event.preventDefault()
      addPerson(newContact)
      setNewContact({ name: '', number: '' })
    }

    return (
      <form onSubmit={handleSubmit}>
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