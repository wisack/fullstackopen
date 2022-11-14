import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'


const App = () => {
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const [countries, setCountries] = useState([])
  const [newFilter, setFilter] = useState('')

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }


  return (
    <div>
      <h1>Find countries: </h1> 
      <Filter value={newFilter} onChange={handleFilter} setFilter={setFilter}/>
      <ul>
      <Countries countries={countries} newFilter={newFilter} setFilter={setFilter}/>
      </ul>
    </div>
  )
}

export default App;
