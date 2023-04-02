import React from 'react'
import { Typography,Button } from '@mui/material'
import { NavLink } from 'react-router-dom'
export const Achievement = () => {
  return (
    <div className="achievement-container">
    <Typography variant="h5" gutterBottom>
    Achievement
    </Typography>
   
    <NavLink to="/achievement/createachievement"> 
      <Button variant="contained" color="success">
        Create New Achievement
      </Button>
    </NavLink>
    
  </div>
  )
}
