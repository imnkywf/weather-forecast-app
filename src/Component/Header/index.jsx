import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux';
import { sendLocation } from '../Redux/actionCreator';
import './index.css'
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

function Header(props) {
  const [iptLocation, setIptLocation] = useState()
  const locationRef = useRef(0)

  const handleIpt = () => {
    const { value } = locationRef.current
    setIptLocation(value)
    props.sendLocation(iptLocation)
  }

  useEffect(() => {

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


export default connect(
  state => ({ location: state }),
  { sendLocation }
)(Header)