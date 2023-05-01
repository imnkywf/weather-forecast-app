import React, { useEffect, useState } from 'react'
import './index.css'

const key = '895284fb2d2c50a520ea537456963d9c'


const getgeocodingFromAPI = async (city) => {
  const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q='shanghai'&limit=1&appid=${key}`
  const cords = await (await fetch(geocodingUrl)).json()
  return cords[0]
}

const getDataFromAPI = async () => {
  const cords = await getgeocodingFromAPI()
  const { lat, lon } = cords
  const dataUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}`
  const data = await (await fetch(dataUrl)).json()
  return data
}

export default function Content() {
  const [data, setData] = useState({})

  useEffect(() => {
    getDataFromAPI().then((res) => {
      setData(res);
      console.log(res);
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }, [])

  return (
    <div className='content'>
      <div className="text">{data.lat}</div>
    </div>
  )
}
