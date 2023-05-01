import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { sendLocation } from '../Redux/actionCreator';
import './index.css'
import nightBgc from '../../Images/Night-bgc.jpg'
import dayBgc from '../../Images/Day-bgc.jpg'

const key = 'f8af435890e6e5a851981bc80ccb4394'

const getgeocodingFromAPI = async (city) => {
  const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${key}`
  const cords = await (await fetch(geocodingUrl)).json()
  return cords[0]
}

const getDataFromAPI = async (city) => {
  const cords = await getgeocodingFromAPI(city)
  const { lat, lon } = cords
  const dataUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}`
  const data = await (await fetch(dataUrl)).json()
  return data
}

function Content(props) {
  const [data, setData] = useState({})
  const [backgroundImage, setBackgroundImage] = useState(nightBgc)

  useEffect(() => {
    getDataFromAPI(props.location).then(res => setData(res)).catch(err => console.log(err))

    setBackgroundImage(dayBgc)

  }, [props.location])

  return (
    <div className='content' style={{ backgroundImage: `url(${backgroundImage})` }} >
      <div className="container">
        <div className="top">
          <div className="location">
            <p>Cambridge</p>
            <div className="temp">
              <h1>65°C</h1>
            </div>

            <div className="description">
              <p>Clouds</p>
            </div>
          </div>
        </div>

        <div className="bottom">
          <div className="feels">
            <p>65°C</p>
            <p>Feels</p>
          </div>

          <div className="humidity">
            <p>20%</p>
            <p>Humidity</p>
          </div>

          <div className="wind">
            <p>1 MPH</p>
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
