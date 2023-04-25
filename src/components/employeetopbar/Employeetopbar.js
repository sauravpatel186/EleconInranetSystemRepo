import React, { createContext, useState, useEffect } from 'react'
import "./Employeetopbar.css"
import { useDispatch, useSelector } from 'react-redux'

import {
  ExpandMore,
  Menu as MenuIcon
} from "@mui/icons-material"
import { Menu, MenuItem } from '@mui/material'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'

import { useMediaQuery, useTheme, Dialog, DialogActions, DialogTitle, Button, DialogContent, DialogContentText, TextField } from '@mui/material'

import { Profile } from '../profile/Profile'


export const Employeetopbar = (props) => {
  const [user,setUser]= useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));
  const [dialogopen, setDialogOpen] = React.useState(false);
  const handleClickOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const open = Boolean(anchorEl);
  let history = useHistory();
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
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLogin");
    localStorage.removeItem("role");
    props.setisLoggedIn(false)
    props.close();
    history.push("/");
  }
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("user"));
    if (data !== undefined && data !== null) {
      setUser(data);

    }
    else {
      setUser([]);
    }
  }, [])
  const visible = createContext();
  return (
    <div className='topbar-container'>
      <div className='profile-area'>
        <div className='profile'>
          <div className='profile-photo'>
          {user.length > 0 ? <img src={user[0].njImage} className="profile-image" onClick={handleClick} /> : <img className="profile-image" src="/profile-1.jpg" onClick={handleClick} />}

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
          <MenuItem onClick={handleClickOpen}>Profile</MenuItem>
          <MenuItem onClick={() => {
            handleClose()
            props.close()
          }}>Back To Intranet</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
      <button id='menu-btn' name='hambutton' onClick={openSidebar}>
        <span><MenuIcon /></span>
      </button>
      <Dialog
        fullScreen={fullScreen}
        open={dialogopen}
        onClose={handleDialogClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Profile
        </DialogTitle>
        <DialogContent>

          <Profile/>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDialogClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>

  )
}
