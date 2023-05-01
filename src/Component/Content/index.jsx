import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { sendLocation } from '../Redux/actionCreator';
import './index.css'

const key = '895284fb2d2c50a520ea537456963d9c'

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

  useEffect(() => {
    getDataFromAPI(props.location).then((res) => {
      setData(res);
    }).catch(err => {
      console.log(err);
    })
  }, [props.location])

  return (
    <div className='content'>
      <div className="text">{data.timezone}</div>
    </div>
  )
}

export default connect(
  state => ({ location: state }),
  { sendLocation }
)(Content)
