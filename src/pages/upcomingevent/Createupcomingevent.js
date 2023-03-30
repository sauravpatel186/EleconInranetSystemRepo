//import React from "react";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import "../upcomingevent/upcomingevent.css";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Createupcomingevent = () => {
  return (
    <div className="createupcomingevent_container">
      <Typography variant="h4" gutterBottom>
        Upcoming Event
      </Typography>
      <div className="subcontainer">
        <Typography variant="overline" display="block" gutterBottom>
          Create Upcoming Event
        </Typography>
        <br />
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": {
              m: 1,
              // width: "25ch",
              width:"60ch",
              borderColor: "black",
            },
          }}
          noValidate
          autoComplete="off">
          <Grid container spacing={2} >
            <Grid item xs={6}>
              Title
              <TextField
                required
                id="outlined-required"
                label="Title"
                style={{ width: "600px" }}
              />
            </Grid>
            <Grid item xs={6}>
              Event Organizer
              <TextField
                required
                id="outlined-required"
                label="Event Organizer"
                defaultValue=""
                style={{ width: "600px" }}
              />
            </Grid>
            {/* <Grid item xs={6} >
              <Item>xs=6 md=4</Item>
            </Grid>
            <Grid item xs={6} >
              <Item>xs=6 md=8</Item>
            </Grid> */}
          </Grid>
          <div>
            <TextField
              required
              fullWidth
              id="outlined-required"
              label="Plant"
              defaultValue=""
            />
            <TextField
              required
              fullWidth
              id="outlined-required"
              label="Venue"
              defaultValue=""
            />
            <TextField
              required
              fullWidth
              id="outlined-required"
              label="Event Organizer"
              defaultValue=""
            />
          </div>
        </Box>
      </div>
    </div>
  );
};

export default Createupcomingevent;
