import React, { useState } from 'react'
import "./Topbar.css"

import {ExpandMore,
        Menu as MenuIcon} from "@mui/icons-material"
import { Menu , MenuItem} from '@mui/material'
import { Sidebar } from '../sidebar/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import {displayReducer,  displayActions } from '../../state/reducers/displayReducer'
export const Topbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  // const [navEl,setNavEl] = useState(false);
  // const openNav= Boolean(navEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const display = useSelector(state => state.showIcon);
  console.log(display);
  const dispatch = useDispatch();
   const handleNavigation = (event) =>{
     displayActions.toogleCounter(false);
   }
 
  return (
    <div className='topbar-container'>
        <div className='profile-area'>
          <div className='profile'>
            <div className='profile-photo'>
              <img src="profile-1.jpg" onClick={handleClick}/>
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
        <button id='menu-btn' onClick={()=>dispatch(displayActions.toogleCounter(false))}>
          <span><MenuIcon/></span>
        </button>
      </div>
  
  )
}
