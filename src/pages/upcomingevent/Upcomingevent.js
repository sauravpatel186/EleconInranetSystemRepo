import React from "react";
import {
  Routes,
  Route,
  BrowserRouter,
  Switch,
  useNavigate,
  NavLink,
} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
const Upcomingevent = () => {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Upcoming Event
      </Typography>
      <NavLink to="/createupcomingevent"> 
        <Button variant="contained" color="success">
          Create Upcoming Event
        </Button>
      </NavLink>
    </>
  );
};

export default Upcomingevent;
