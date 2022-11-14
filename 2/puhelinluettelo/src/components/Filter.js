import React from 'react'

const Filter = ({newFilter, handleFilterChange}) => {
    return (
    <div> filter by name: <input
    value={newFilter}
    onChange={handleFilterChange}/>
    </div>
    )
}

export default Filter