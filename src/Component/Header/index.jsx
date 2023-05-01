import React, { useEffect, useRef, useState } from 'react'
import { Connect } from 'react-redux';
import './index.css'
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

function Header() {
  const [iptLocation, setIptLocation] = useState()
  const locationRef = useRef(0)

  const handleIpt = () => {
    const { value } = locationRef.current
    setIptLocation(value)
  }

  useEffect(() => {
    console.log(iptLocation);
  })
  return (
    <div className='header'>
      <div className="search-box">
        <input type="text" name="" id="" className='location-input' placeholder='Location...' ref={locationRef} />
        <Button className='search-btn' variant="contained" startIcon={<SearchIcon />} onClick={handleIpt}>
        </Button>
      </div>
    </div>
  )
}


export default Connect()(Header)