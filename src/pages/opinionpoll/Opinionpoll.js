import React from "react";
import { useState, useEffect } from "react";
import { Link, NavLink, useRouteMatch, Route } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./opinionpoll.css";
import { Checkbox } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { Delete } from "@mui/icons-material";
import { Breadcrumbs, Divider } from "@mui/material";
import Createopinionpoll from "../createopinionpoll/Createopinionpoll";
const Opinionpoll = () => {
  return (
    <div>
      <div className="page-information-container">
        <div className="page-header">
          <label>Opinionpoll</label>
        </div>
        <div className='page-breadscrumb'>
              <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/" exact to="/">
                  Home
                </Link>
                <Link
                  underline="hover" color="inherit" href="/opinionpoll" exact to="/opinionpoll">
                  Opinion Poll
                </Link>
              </Breadcrumbs>
            </div>
        <div className="upcomingevent-container">
          <div className="upcomingevent-container-button">
            <Route exact path="/upcomingevent/createupcomingevent">
              <Createopinionpoll />
            </Route>
            <NavLink to="/opinionpoll/createopinionpoll">
              <Button variant="contained" color="success">
                Create Opinionpoll
              </Button>
            </NavLink>
            <Route exact path="/opinionpoll/createopinionpoll">
              <Createopinionpoll />
            </Route>
            <NavLink to="/opinionpoll/createopinionpoll">
              <Button variant="contained" color="error">
                Disable Selected
              </Button>
            </NavLink>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>
                    <Checkbox size="small" />
                  </th>
                  <th>Opinion Title</th>
                  <th>Description</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {/* {eventdata.map((e) => {
              return (
                <tr key={e.id}>
                  <td><Checkbox size="small"/></td>
                  <td>{e.title}</td>
                  <td>{e.eventorganizer}</td>
                  <td>{e.description}</td>
                  <td>{e.department}</td>
                  <td>{e.venue}</td>
                  <td><Edit/></td>
                  <td><Delete/></td>
                </tr>
              );
            })} */}
                <td>
                  <Checkbox size="small" />
                </td>
                <td>Demo</td>
                <td>Demo</td>
                <td>Demo</td>
                <td>Demo</td>
                <td>
                  <Edit />
                </td>
                <td>
                  <Delete />
                </td>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Opinionpoll;
