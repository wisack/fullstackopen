import React from 'react'
import Weather from './Weather'


const Countries = ({countries,newFilter, setFilter}) => {
    
    const filteredName = countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase())).map((country,i) => <li key={i}>
         {country.name.common}<button onClick={() => setFilter(country.name.common)}>Show</button></li>)

    const filteredNameWithoutButton = countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase())).map((country,i) => <li key={i}>
    {country.name.common}</li>)
    
    const filterCapital = countries.filter(country => country.name.common.toLowerCase()
    .includes(newFilter.toLowerCase())).map(country => 
    country.capital)
    console.log(filterCapital)
    
    const filterPopulation = countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase())).map(country => country.population)

    const filterLanguages = countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase())).map(country => country.languages)

    const transformObject = () =>{
         if (filterLanguages.length > 0) {
            return (
                Object.keys(filterLanguages[0]).map((value,i) => <li key={i}>{filterLanguages[0][value]}</li>)
            )
         }
    }
    const readObject = transformObject()

    const filterFlag = countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase())).map(country => country.flags.png)
    
    
        if (newFilter==='') {
            return <div>Use filter</div>
        }
        else if (filteredName.length > 10) {
            return <div>Over 10 search results.</div>
        }
        else if (filteredName.length < 10 && filteredName.length > 1) {
            return <div>{filteredName}</div>
        }
        else if (filteredName.length===1) {
            return (
                <div><h1>{filteredNameWithoutButton}</h1> <br />Capital: {filterCapital}<br />
                Population: {filterPopulation}<br />
                <h2>languages</h2>
                <ul>{readObject}</ul><br />
                <img src={filterFlag} alt="flag" width="250" height="150"/>
                <Weather filterCapital={filterCapital}/>
                </div>
            )
        }
        else if (filteredName.length===0) {
            return <div>No search results</div>
        }
    }

export default Countries