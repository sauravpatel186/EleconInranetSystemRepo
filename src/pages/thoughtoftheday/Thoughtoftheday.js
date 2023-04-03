import React from 'react'
import {
    NavLink,
    useRouteMatch
  } from "react-router-dom";
  import Typography from "@mui/material/Typography";
  import Button from "@mui/material/Button";

const Thoughtoftheday = () => {
    let { path, url } = useRouteMatch();
return (
    <div className='thoughtoftheday-container'>
    <Typography variant="h5" gutterBottom>
        Thought Of The Day
    </Typography>
    <NavLink to="/createthought"> 
    <Button variant="contained" color="success">
        Create Thought 
    </Button>
    </NavLink>
    </div>
)
}

export default Thoughtoftheday