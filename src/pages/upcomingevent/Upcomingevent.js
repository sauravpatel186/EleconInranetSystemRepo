import React from "react";
import { useState,useEffect } from "react";
import {
  Link,NavLink,
  useRouteMatch
} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
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
      <NavLink to="/createupcomingevent"> 
        <Button variant="contained" color="success">
          Create Upcoming Event
        </Button>
      </NavLink>
      <div className="App">
      <table>
        <tr>
          <th>Title</th>
          <th>Event Organizer</th>
          <th>Department</th>
          <th>Venue</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>RSVP</th>
          <th>Description</th>
        </tr>
        <tr>
          <td>Anom</td>
          <td>19</td>
          <td>Male</td>
        </tr>
        <tr>
          <td>Megha</td>
          <td>19</td>
          <td>Female</td>
        </tr>
        <tr>
          <td>Subham</td>
          <td>25</td>
          <td>Male</td>
        </tr>
      </table>
    </div>
    </div>
  );
};

export default Upcomingevent;
