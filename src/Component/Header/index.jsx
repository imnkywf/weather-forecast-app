import React from 'react'
import './index.css'
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

export default function Header() {
  return (
    <div className='header'>
      <div className="search-box">
        <input type="text" name="" id="" className='location-input' placeholder='Location...' />
        <Button className='search-btn' variant="contained" startIcon={<SearchIcon />}>
        </Button>
      </div>
    </div>
  )
}
