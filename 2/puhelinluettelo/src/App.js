import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Form from './components/Form'
import NoteService from './services/Notes'
import Notification from './components/Notification'

const App = () => {
  useEffect(() => {
    NoteService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
  }, [])

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    if (!persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
    const nameObject = {
      name: newName,
      number: newNumber
    }
   
    setNewName('')
    setNewNumber('')
    NoteService
    .create(nameObject)
    .then(returnedNotes => {
      setPersons(persons.concat(returnedNotes))
      setMessage(`Added: ${newName}`)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
      .catch(error => {
        setErrorMessage(error.response.data.error.message)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        
      })
      
  }else {
    const person = persons.find(p => p.name === newName)
    const changedPerson = { ...person, number: newNumber }
    const { id } = person

    if (window.confirm(`Overwrite number for:  ${newName}?`)) {
      NoteService
      .update(id, changedPerson)
      .then(() => {
        setPersons(persons.map(person => person.id !== id ? person : changedPerson))
        setMessage(`Overwrote: ${newName}`)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
      .catch(error => {
        setErrorMessage(`${newName} already deleted from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        })
  }
  } 
}

  const removeName = (person) => {
  if (window.confirm(`Delete user ${person.name}?`)) {
    NoteService
    .remove(person.id)
    .then(()=> {
      const filtState = persons.filter(n => n.id !== person.id)
      setPersons(filtState)
      setMessage(`Deleted: ${person.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    })
    .catch(error => {
      setErrorMessage(`Error updating: ${newName}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
      })
    }
  }
  

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>Add a new contact</h2>
      <Form addName={addName} newName={newName} handleNoteChange={handleNoteChange} newNumber={newNumber} handleNumChange={handleNumChange}/>
      <Notification message={message} errorMessage={errorMessage}/>
      <h2>Contacts</h2>
      <ol>
      <Persons persons={persons} newFilter={newFilter} removeName={removeName}/>
      </ol>
    </div>
  )

}

export default App
