import React from 'react'

const Filter = ({value,onChange,setFilter}) => {

    return (
    <div>Filter by name: 
    <input 
    value={value}
    onChange={onChange}/>
    <button onClick={() => setFilter("")}>Clear</button>
    
    </div>

    )
}





export default Filter;