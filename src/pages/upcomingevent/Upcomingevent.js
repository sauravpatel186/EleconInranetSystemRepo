import React from "react";
import { useState,useEffect } from "react";
import {
  Link,NavLink,
  useRouteMatch,Route
} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Createupcomingevent from "../createupcomingevent/Createupcomingevent";
const Upcomingevent = (props) => {
   let { path, url } = useRouteMatch();
  //  useEffect(() => {
  //   let data = localStorage.getItem("data");
  //   if (data) {
  //     setEvent(JSON.parse(data));
  //   }
  // }, []);
  return (
    <div className="upcomingevent-container">
      <Typography variant="h5" gutterBottom>
        Upcoming Event
      </Typography>
      <Route exact path="/upcomingevent/createupcomingevent"><Createupcomingevent/></Route>
      <NavLink to="/upcomingevent/createupcomingevent"> 
        <Button variant="contained" color="success">
          Create Upcoming Event
        </Button>
      </NavLink>
      
    </div>
  );
};

export default Upcomingevent;
