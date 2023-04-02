//import React from "react";
import * as React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import "./Createupcomingevent.css"
import { Divider,Link,Breadcrumbs } from "@mui/material";
const Createupcomingevent = () => {
  return (
<div className='page-information-container'>
    <header className="page-header"><label>Upcoming Event</label></header>
    <div className='page-breadscrumb'>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="/upcomingevent">
          Upcoming Event
        </Link>
        <Link
          underline="hover"
          color="text.primary"
          href="/createupcomingevent"
          aria-current="page">
          Createupcoming Event
        </Link>
      </Breadcrumbs>
      </div>
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
