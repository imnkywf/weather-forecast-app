import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { sendLocation } from '../Redux/actionCreator';
import './index.css'
import nightBgc from '../../Images/Night-bgc.jpg'
import dayBgc from '../../Images/Day-bgc.jpg'

// const key = ''

const getgeocodingFromAPI = async (city) => {
  const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${key}`
  const cords = await (await fetch(geocodingUrl)).json()
  return cords[0]
}

const getDataFromAPI = async (city) => {
  try {
    const cords = await getgeocodingFromAPI(city)
    const { lat, lon } = cords
    const dataUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}`
    const data = await (await fetch(dataUrl)).json()
    return data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch weather data')
  }
}

function Content(props) {
  const [data, setData] = useState({
    timezone: 2000,
    current: {
      temp: 300,
      weather: [{ main: 'cloudy' }],
      humidity: 50,
      wind_speed: 5,
      dt: 1682938346
    }

  })
  const [backgroundImage, setBackgroundImage] = useState(nightBgc)

  useEffect(() => {
    getDataFromAPI(props.location).then(res => {
      setData(res)
    }).catch(err => console.log(err))
  }, [props.location])

  useEffect(() => {
    let timestamp = data.current.dt
    let date = new Date(timestamp * 1000)
    if (date.getHours() >= 12) {
      setBackgroundImage(nightBgc)
    } else {
      setBackgroundImage(dayBgc)
    }
  }, [data])

  return (
    <div className='content' style={{ backgroundImage: `url(${backgroundImage})` }} >
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{props.location}</p> <p>Timezone: {data.timezone}</p>
            <div className="temp">
              <h1>{Math.floor(data.current.temp - 273.15)}°C</h1>
            </div>

            <div className="description">
              <p>{data.current.weather[0].main}</p>
            </div>
          </div>
        </div>

        <div className="bottom">
          <div className="feels">
            <p>{data.current.weather[0].main}</p>
            <p>Feels</p>
          </div>

          <div className="humidity">
            <p>{data.current.humidity}%</p>
            <p>Humidity</p>
          </div>

          <div className="wind">
            <p>{data.current.wind_speed} MPH</p>
            <p>wind speed</p>
          </div>
        </div>


      </div>
    </ div >
  )
}

export default connect(
  state => ({ location: state }),
  { sendLocation }
)(Content)
