import React, { createContext, useState ,useEffect} from 'react'
import "./Topbar.css"
import { useDispatch, useSelector } from 'react-redux'

import {ExpandMore,
        Menu as MenuIcon} from "@mui/icons-material"
import { Menu , MenuItem} from '@mui/material'
export const Topbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const sideMenu = document.getElementsByClassName("sidebar-container");

  const openSidebar = () => {
    
    sideMenu[0].style.display = "flex";
    sideMenu[0].style.flexDirection = "column";
  
}
  const visible = createContext();
  return (
    <div className='topbar-container'>
        <div className='profile-area'>
          <div className='profile'>
            <div className='profile-photo'>
              <img className="profile-image" src="/profile-1.jpg" onClick={handleClick}/>
            </div>
          </div>
          <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
        </div>
      <button id='menu-btn' name='hambutton' onClick={openSidebar}>
          <span><MenuIcon/></span>
        </button>
      </div>
  
  )
}
