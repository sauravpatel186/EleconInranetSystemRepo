import React from "react";
import { useState, useEffect } from "react";
import {
  Link, NavLink,
  useRouteMatch, Route
} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Createupcomingevent from "../createupcomingevent/Createupcomingevent";
import "./Upcomingevent.css";
import { Checkbox } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { Delete } from "@mui/icons-material";
const Upcomingevent = (props) => {
  const { path, url } = useRouteMatch();
  const [eventdata, seteventdata] = useState([]);
  const getLocalItem = () => {
    let data = JSON.parse(localStorage.getItem("data"));
    console.log(data[0]["id"]);

    console.log(url);
    if (data) {
      seteventdata(JSON.parse(localStorage.getItem("data")));
    }
    else {
      return [];
    }
  }

  useEffect(() => {
    try {
      getLocalItem();
    }
    catch (error) {
      console.error(error);
    }
  }, [])
  return (
    <div className="page-information-container">
      <div className="page-header"><label>
        Upcoming Event
      </label>
      </div>
      <div className="upcomingevent-container">
        <div className="upcomingevent-container-button">
          <Route exact path="/upcomingevent/createupcomingevent"><Createupcomingevent /></Route>
          <NavLink to="/upcomingevent/createupcomingevent">
            <Button variant="contained" color="success">
              Create Upcoming Event
            </Button>
          </NavLink>
          <Route exact path="/upcomingevent/createupcomingevent"><Createupcomingevent /></Route>
          <NavLink to="/upcomingevent/createupcomingevent">
            <Button variant="contained" color="error">
              Disable Selected
            </Button>
          </NavLink>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th><Checkbox size="small" /></th>
                <th>Title</th>
                <th>Organizer</th>
                <th>Description</th>
                <th>Department</th>
                <th>Venue</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {eventdata.map((e) => {
                return (
                  <tr key={e.id}>
                    <td><Checkbox size="small" /></td>
                    <td>{e.title}</td>
                    <td>{e.eventorganizer}</td>
                    <td>{e.description}</td>
                    <td>{e.department}</td>
                    <td>{e.venue}</td>
                    <td><Edit /></td>
                    <td><Delete /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Upcomingevent;