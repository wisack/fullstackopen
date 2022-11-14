import React from 'react'

const Form = ({addName, newName, handleNoteChange, newNumber,handleNumChange}) => {
    
    return (
        
        <form onSubmit={addName}>
        <div>name: <input
        value={newName}
        onChange={handleNoteChange}
        /></div>
        <div>number: <input
        value={newNumber}
        onChange={handleNumChange}
        /></div>
        <button type="submit">add</button>
      </form>
    )
}

export default Form