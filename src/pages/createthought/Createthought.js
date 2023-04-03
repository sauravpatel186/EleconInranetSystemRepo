// import React from 'react'
import * as React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import "./Createthought.css"
import { Divider } from "@mui/material";

const Createthought = () => {
return (
    <div className='page-information-container'>
    <header className="page-header"><label>Thought Of The Day</label></header>
    <div className="createthoughtoftheday-container">

    <div className="createthouoghtoftheday-header">
        <Typography className="header-font" variant="body" gutterBottom>Create a new Thought</Typography>
    </div>
    <div className="form-line">
        <Divider sx={{borderBottomWidth: 2}}/>
    </div>
    <div className="createthoughtform">
        <div className="formrow">
        <div className="createthoughtforminput">
            <TextField className="title-container"
                label="Title" 
                required
                variant="outlined" 
                // sx={{width:100+"%"}}
                />
        </div>
        <div className="createthouoghtforminput">
            <TextField className="thought-container"
                label="Thought"
                required 
                variant="outlined" 
                // sx={{width:100+"%"}}
                />
        </div>
        <div className="createthoughtforminput">
            <TextField className="tpyes-container" type="select" 
                label="Title" 
                required
                variant="outlined"/>
            </div>
            <div className="createeventforminput">
                <TextField className="date-input" type="date"
                required 
                variant="outlined" 
                // sx={{width:100+"%"}}
                />
            </div>
        </div>

    </div>
    </div>
</div>
)
}

export default Createthought