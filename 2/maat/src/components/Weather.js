import React from 'react'
import axios from 'axios'
import {useEffect, useState} from 'react'




const Weather = ({filterCapital}) => {

    const apiKey = process.env.REACT_APP_API_KEY
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${filterCapital}&appid=${apiKey}`
    const [weatherInfo, setWeatherInfo] = useState([])

    useEffect(() => {
  
        axios
          .get(apiUrl)
          .then(response => {
            setWeatherInfo(weatherInfo.concat(response.data))
          })
      }, [])

      const temp = weatherInfo.map(m => m.main.temp)

    return (
        <div>Weather: {temp}</div>
    )
}

export default Weather;