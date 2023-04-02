//import React from "react";
import * as React from "react";
import { useEffect,useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./Createupcomingevent.css";
import { Divider } from "@mui/material";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateField } from "@mui/x-date-pickers/DateField";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showToastMessage = () => {
  toast.success('Success Notification !', {
      position: toast.POSITION.TOP_RIGHT
  });
};


const Createupcomingevent = () => {
  const [Event, setEvent] = useState([]);
  const [newTitle, setnewTitle] = useState("");
  const [newEventOrganizer, setnewEventOrganizer] = useState("");
  const [newDescription, setnewDescription] = useState("");
  const [newVenue, setnewVenue] = useState("");
  const [newDepartment, setnewDepartment] = React.useState("");
  const [RSVP, setRSVP] = React.useState("");
  const [startdate, setstartdate] = React.useState(null);
  const [enddate, setenddate] = React.useState(null);

  useEffect(() => {
    let data = localStorage.getItem("data");
    if (data) {
      setEvent(JSON.parse(data));
    }
  }, []);

  let value
  const addHandler = () => {
    let newEvent = {
      id: Math.random(),
      title: newTitle,
      eventorganizer: newEventOrganizer,
      department:newDepartment,
      venue: newVenue,
      startdate:startdate,
      enddate:enddate,
      RSVP:RSVP,
      time:Math.floor(Date.now() / 1000),
      description: newDescription,
      isCompleted: false,
      isDeleted: false,
    };
    if(newEvent.title===""){
      alert("Title cannot be empty! Please enter a title!!!")
      return false;
    }
    if(newEvent.description===""){
      alert("Description cannot be empty! Please enter a description!!!")
      return false;
    }
    if(newEvent.eventorganizer===""){
      alert("Event Organizer cannot be empty! Please enter a event organizer!!!")
      return false;
    }
    if(newEvent.startdate===""){
      alert("Start Date cannot be empty! Please enter a date!!!")
      return false;
    }
    if(newEvent.RSVP===""){
      alert("RSVP field cannot be empty! Please enter RSVP!!!")
      return false;
    }
    if(newEvent.enddate===""){
      alert("End Date cannot be empty! Please enter a date!!!")
      return false;
    }
    if(newEvent.venue===""){
      alert("Venue cannot be empty! Please enter a venue!!!")
      return false;
    }
    if(newEvent.department===""){
      alert("Department field cannot be empty! Please enter a department!!!")
      return false;
    }
    Event.push(newEvent);
    setEvent([...Event]);

    localStorage.setItem("data", JSON.stringify(Event));
    showToastMessage();
  };

  const handleDepartmentChange = (event) => {
    setnewDepartment(event.target.value);
  };
  const handleRSVPChange = (event) => {
    setRSVP(event.target.value);
  };
  console.log(Event);
  return (
    <>
      <div className="page-information-container">
        <header className="page-header">
          <label>Upcoming Event</label>
        </header>
        <div className="createupcomingevent-container">
          <div className="createupcomingevent-header">
            <Typography className="header-font" variant="body" gutterBottom>
              Create a new event
            </Typography>
          </div>
          <div className="form-line">
            <Divider sx={{ borderBottomWidth: 2 }} />
          </div>
          <div className="createeventform">
            <div className="formrow">
              <div className="createeventforminput">
                <TextField
                  label="Title"
                  required
                  size="medium"
                  variant="outlined"
                  onChange={(data) => setnewTitle(data.target.value)}
                  sx={{ width: 100 + "%" }}
                />
              </div>
              <div className="createeventforminput">
                <TextField
                  label="Event Organizer"
                  required
                  variant="outlined"
                  onChange={(data) => setnewEventOrganizer(data.target.value)}
                  sx={{ width: 100 + "%" }}
                />
              </div>
            </div>
            <div className="formrow">
              <div className="createeventforminput">
                {/* <TextField
                label="Title"
                required
                size="medium"
                variant="outlined"
                sx={{ width: 100 + "%" }}
              /> */}
                <FormControl sx={{ width: 100 + "%" }}>
                  <InputLabel id="demo-simple-select-autowidth-label" required>
                    Department
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth-label"
                    value={newDepartment}
                    onChange={handleDepartmentChange}
                    variant="outlined"
                    label="Department">
                    {/* <MenuItem value="">
                    <em>None</em>
                  </MenuItem> */}
                    <MenuItem value="Department1">Department1</MenuItem>
                    <MenuItem value="Department2">Department2</MenuItem>
                    <MenuItem value="Department3">Department3</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="createeventforminput">
                <TextField
                  label="Venue"
                  required
                  variant="outlined"
                  onChange={(data) => setnewVenue(data.target.value)}
                  sx={{ width: 100 + "%" }}
                />
              </div>
            </div>
            <div className="formrow">
              <div className="createeventforminput">
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
                <DemoContainer components={["DatePicker", "DatePicker"]}>
                  <DatePicker
                    label="Start Date"
                    value={startdate}
                    sx={{ width: 100 + "%" }}
                    disablePast
                    format="DD-MM-YYYY"
                    onChange={(newValue) => setstartdate(newValue)}
                  />
                </DemoContainer>
              {/* </LocalizationProvider> */}
              </div>
              <div className="createeventforminput">
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
                  <DemoContainer required components={["DatePicker", "DatePicker"]}>
                    <DatePicker
                      label="End Date"
                      value={enddate}
                      required
                      format="DD-MM-YYYY"
                      sx={{ width: 100 + "%" }}
                      onChange={(newValue) => setenddate(newValue)}
                      disablePast
                    />
                  </DemoContainer>
                {/* </LocalizationProvider> */}
              </div>
              <div className="createeventforminput">
                {/* <TextField
                label="Title"
                required
                size="medium"
                variant="outlined"
                sx={{ width: 100 + "%" }}
              /> */}
                <FormControl sx={{ width: 100 + "%" , marginTop:"1vh" }}>
                  <InputLabel id="demo-simple-select-autowidth-label" required>
                    RSVP
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={RSVP}
                    onChange={handleRSVPChange}
                    variant="outlined"
                    label="RSVP">
                    {/* <MenuItem value="">
                    <em>None</em>
                  </MenuItem> */}
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="formrow">
              <div className="createeventforminput">
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  rows={4}
                  defaultValue=""
                  variant="outlined"
                  onChange={(data) => setnewDescription(data.target.value)}
                  sx={{ width: 100 + "%" }}
                />
              </div>
            </div>
            <div className="formrow">
              <div className="createeventforminput">
                <Button variant="contained" color="success" onClick={addHandler}>
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Createupcomingevent;
