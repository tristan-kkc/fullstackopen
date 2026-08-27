import { useState, useEffect } from 'react'
import weatherService from '../services/weather'

const Weather = ({lat, lon, country}) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        if (lat && lon) {
            weatherService.getWeather(lat, lon)
            .then(data => setWeather(data))
        }
    }, [lat,lon])

    if (!weather) return <p>Loading weather data...</p>
    
     return (
    <div>
      <h3>Weather in {country}</h3>
      <p>Temperature {weather.main.temp} Celsius</p>
      <img 
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description} 
      />
      <p>Wind {weather.wind.speed} m/s</p>
    </div>
  )
}

export default Weather