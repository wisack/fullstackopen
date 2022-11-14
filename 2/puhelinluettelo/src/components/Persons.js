import React from 'react'

const Persons = ({persons, newFilter, removeName}) => {
    return (
        persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
        .map((person,i) => 
        <li key={person.id}> {person.name} - {person.number}
        <button onClick={ () =>removeName(person)}>delete</button>
        </li>
        )
    )
}

export default Persons