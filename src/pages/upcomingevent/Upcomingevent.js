import React from "react";
import {
  Link,NavLink,
  useRouteMatch
} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
const Upcomingevent = () => {
   let { path, url } = useRouteMatch();
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
    </div>
  );
};

export default Upcomingevent;
