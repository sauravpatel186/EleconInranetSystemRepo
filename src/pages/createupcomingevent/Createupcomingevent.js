//import React from "react";
import * as React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import "./Createupcomingevent.css"
import { Divider } from "@mui/material";
const Createupcomingevent = () => {
  return (
<div className='page-information-container'>
    <header className="page-header"><label>Upcoming Event</label></header>
    <div className="createupcomingevent-container">

      <div className="createupcomingevent-header">
        <Typography className="header-font" variant="body" gutterBottom>Create a new event</Typography>
      </div>
      <div className="form-line">
        <Divider sx={{borderBottomWidth: 2}}/>
      </div>
      <div className="createeventform">
        <div className="formrow">
          <div className="createeventforminput">
              <TextField 
                label="Title" 
                required
                size = "medium"
                variant="outlined" 
                sx={{width:100+"%"}}/>
          </div>
          <div className="createeventforminput">
              <TextField 
                label="Title"
                required 
                variant="outlined" 
                sx={{width:100+"%"}}/>
          </div>
        </div>
        <div className="formrow">
            <div className="createeventforminput">
                <TextField 
                  label="Title" 
                  required
                  size = "medium"
                  variant="outlined" 
                  sx={{width:100+"%"}}/>
            </div>
            <div className="createeventforminput">
                <TextField label="Title" required variant="outlined" sx={{width:100+"%"}}/>
            </div>
      </div>
      </div>
    </div>
</div>
  );
};

export default Createupcomingevent;
