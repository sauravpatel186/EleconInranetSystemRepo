//import React from "react";
import * as React from "react";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./Createupcomingevent.css";
import { ValidationErrorMessage } from "../../components/ValidationErrorMessage/ValidationErrorMessage"
import { Breadcrumbs, Divider, Input } from "@mui/material";
import dayjs from "dayjs";
import * as Yup from "yup";
import { Formik } from "formik";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateField } from "@mui/x-date-pickers/DateField";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useRouteMatch,useHistory} from "react-router-dom";

const showToastMessage = () => {
  toast.success('Success Notification !', {
    position: toast.POSITION.TOP_RIGHT
  });
};


// const Createupcomingevent = () => {
  // const [Event, setEvent] = useState([]);
  // const [newTitle, setnewTitle] = useState("");
  // const [newEventOrganizer, setnewEventOrganizer] = useState("");
  // const [newDescription, setnewDescription] = useState("");
  // const [newVenue, setnewVenue] = useState("");
  // const [newDepartment, setnewDepartment] = React.useState("");
  // const [RSVP, setRSVP] = React.useState("");
  // const [startdate, setstartdate] = React.useState(null);
  // const [enddate, setenddate] = React.useState(null);
  // const {path,url} = useRouteMatch();
  // useEffect(() => {
  //   let data = localStorage.getItem("data");
  //   if (data) {
  //     setEvent(JSON.parse(data));
  //   }
  // }, []);
  // const navigate = useHistory();
  // let value
  // const addHandler = () => {
  //   let newEvent = {
  //     id: Math.random(),
  //     title: newTitle,
  //     eventorganizer: newEventOrganizer,
  //     department: newDepartment,
  //     venue: newVenue,
  //     startdate: startdate,
  //     enddate: enddate,
  //     RSVP: RSVP,
  //     time: Math.floor(Date.now() / 1000),
  //     description: newDescription,
  //     isCompleted: false,
  //     isDeleted: false,
  //   };
  //   if (newEvent.title === "") {
  //     alert("Title cannot be empty! Please enter a title!!!")
  //     return false;
  //   }
  //   if (newEvent.description === "") {
  //     alert("Description cannot be empty! Please enter a description!!!")
  //     return false;
  //   }
  //   if (newEvent.eventorganizer === "") {
  //     alert("Event Organizer cannot be empty! Please enter a event organizer!!!")
  //     return false;
  //   }
  //   if (newEvent.startdate === "") {
  //     alert("Start Date cannot be empty! Please enter a date!!!")
  //     return false;
  //   }
  //   if (newEvent.RSVP === "") {
  //     alert("RSVP field cannot be empty! Please enter RSVP!!!")
  //     return false;
  //   }
  //   if (newEvent.enddate === "") {
  //     alert("End Date cannot be empty! Please enter a date!!!")
  //     return false;
  //   }
  //   if (newEvent.venue === "") {
  //     alert("Venue cannot be empty! Please enter a venue!!!")
  //     return false;
  //   }
  //   if (newEvent.department === "") {
  //     alert("Department field cannot be empty! Please enter a department!!!")
  //     return false;
  //   }
  //   Event.push(newEvent);
  //   setEvent([...Event]);

  //   localStorage.setItem("data", JSON.stringify(Event));
  //   showToastMessage();
  //   navigate.push("/upcomingevent");
  // };

  // const handleDepartmentChange = (event) => {
  //   setnewDepartment(event.target.value);
  // };
  // const handleRSVPChange = (event) => {
  //   setRSVP(event.target.value);
  // };
  // console.log(Event);
  //return (
  //   <>
  //     <div className="page-information-container">
  //       <header className="page-header">
  //         <label>Upcoming Event</label>
  //       </header>
  //       <div className='page-breadscrumb'>
  //             <Breadcrumbs aria-label="breadcrumb">
  //               <Link underline="hover" color="inherit" href="/" exact to="/" onClick={()=>{navigate.push("/")}}>
  //                 Home
  //               </Link>
  //               <Link
  //                 underline="hover" color="inherit" href="/upcomingevent">
  //                 Upcoming Event
  //               </Link>
  //               <Link
  //                underline="hover"
  //                color="text.primary"
  //                href="/upcomingevent/createupcomingevent"
  //                aria-current="page">
  //                 Createupcoming Event
  //               </Link>
  //             </Breadcrumbs>
  //           </div>
  //       <div className="createupcomingevent-container">
  //         <div className="createupcomingevent-header">
  //           <Typography className="header-font" variant="body" gutterBottom>
  //             Create a new event
  //           </Typography>
  //         </div>
  //         <div className="form-line">
  //           <Divider sx={{ borderBottomWidth: 2 }} />
  //         </div>
  //         <div className="createeventform">
  //           <div className="formrow">
  //             <div className="createeventforminput">
  //               <TextField
  //                 label="Title"
  //                 required
  //                 size="medium"
  //                 variant="outlined"
  //                 onChange={(data) => setnewTitle(data.target.value)}
  //                 sx={{ width: 100 + "%" }}
  //               />
  //             </div>
  //             <div className="createeventforminput">
  //               <TextField
  //                 label="Event Organizer"
  //                 required
  //                 variant="outlined"
  //                 onChange={(data) => setnewEventOrganizer(data.target.value)}
  //                 sx={{ width: 100 + "%" }}
  //               />
  //             </div>
  //           </div>
  //           <div className="formrow">
  //             <div className="createeventforminput">
  //               {/* <TextField
  //               label="Title"
  //               required
  //               size="medium"
  //               variant="outlined"
  //               sx={{ width: 100 + "%" }}
  //             /> */}
  //               <FormControl sx={{ width: 100 + "%" }}>
  //                 <InputLabel id="demo-simple-select-autowidth-label" required>
  //                   Department
  //                 </InputLabel>
  //                 <Select
  //                   labelId="demo-simple-select-autowidth-label"
  //                   id="demo-simple-select-autowidth-label"
  //                   value={newDepartment}
  //                   onChange={handleDepartmentChange}
  //                   variant="outlined"
  //                   label="Department">
  //                   {/* <MenuItem value="">
  //                   <em>None</em>
  //                 </MenuItem> */}
  //                   <MenuItem value="Department1">Department1</MenuItem>
  //                   <MenuItem value="Department2">Department2</MenuItem>
  //                   <MenuItem value="Department3">Department3</MenuItem>
  //                 </Select>
  //               </FormControl>
  //             </div>
  //             <div className="createeventforminput">
  //               <TextField
  //                 label="Venue"
  //                 required
  //                 variant="outlined"
  //                 onChange={(data) => setnewVenue(data.target.value)}
  //                 sx={{ width: 100 + "%" }}
  //               />
  //             </div>
  //           </div>
  //           <div className="formrow">
  //             <div className="createeventforminput">
  //               {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
  //               <DemoContainer components={["DatePicker", "DatePicker"]}>
  //                 <DatePicker
  //                   label="Start Date"
  //                   value={startdate}
  //                   sx={{ width: 100 + "%" }}
  //                   disablePast
  //                   format="DD-MM-YYYY"
  //                   onChange={(newValue) => setstartdate(newValue)}
  //                 />
  //               </DemoContainer>
  //               {/* </LocalizationProvider> */}
  //             </div>
  //             <div className="createeventforminput">
  //               {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
  //               <DemoContainer required components={["DatePicker", "DatePicker"]}>
  //                 <DatePicker
  //                   label="End Date"
  //                   value={enddate}
  //                   required
  //                   format="DD-MM-YYYY"
  //                   sx={{ width: 100 + "%" }}
  //                   onChange={(newValue) => setenddate(newValue)}
  //                   disablePast
  //                 />
  //               </DemoContainer>
  //               {/* </LocalizationProvider> */}
  //             </div>
  //             <div className="createeventforminput">
  //               <FormControl sx={{ width: 100 + "%", marginTop: "1vh" }}>
  //                 <InputLabel id="demo-simple-select-autowidth-label" required>
  //                   RSVP
  //                 </InputLabel>
  //                 <Select
  //                   labelId="demo-simple-select-autowidth-label"
  //                   id="demo-simple-select-autowidth"
  //                   value={RSVP}
  //                   onChange={handleRSVPChange}
  //                   variant="outlined"
  //                   label="RSVP">
  //                   {/* <MenuItem value="">
  //                   <em>None</em>
  //                 </MenuItem> */}
  //                   <MenuItem value="Yes">Yes</MenuItem>
  //                   <MenuItem value="No">No</MenuItem>
  //                 </Select>
  //               </FormControl>
  //             </div>
  //           </div>
  //           <div className="formrow">
  //             <div className="createeventforminput">
  //               <TextField
  //                 id="outlined-multiline-static"
  //                 label="Description"
  //                 multiline
  //                 rows={6}
  //                 defaultValue=""
  //                 variant="outlined"
  //                 onChange={(data) => setnewDescription(data.target.value)}
  //                 sx={{ width: 100 + "%" }}
  //               />
  //             </div>
  //           </div>
  //           <div className="formrow">
  //             <div className="createeventforminput">
  //               <Button variant="contained" color="success" onClick={addHandler}>
  //                 Submit
  //               </Button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </>
//   );
// };
const Createupcomingevent = () => {
  const navigate = useHistory();
    const [newevent,setNewEvent]=useState([]);
    const ValidationSchema = Yup.object().shape({
        eventTitle: Yup.string().required("Event Title is required."),
        eventDepartment: Yup.string().required("Event department is required."),
        eventRSVP: Yup.string().required("Event RSVP is required."),
        eventOrganizerName: Yup.string().required("Event organizer name is required."),
        eventVenue: Yup.string().required("Event venue is required."),
        eventStartDate: Yup.string().required("Start Date is required"),
        eventEndDate: Yup.string().required("End Date is required"),
        eventDescription: Yup.string().required("Event Description is required"),
        eventImage: Yup.string().required("Image is required"),
    })
    const onSelectFile = (e, setFieldValue, setFieldError) => {
        const files = e.target.files;
        if (files?.length) {
            const fileSelected = e.target.files[0];
            const fileNameArray = fileSelected.name.split(".");
            const extension = fileNameArray.pop();
            if (["png", "jpg", "jpeg"].includes(extension?.toLowerCase())) {
                const reader = new FileReader();
                reader.readAsDataURL(fileSelected);
                reader.onload = function () {
                    setFieldValue("eventImage", reader.result);
                };
                reader.onerror = function (error) {
                    throw error;
                };
            } else {
                toast.error("only jpg,jpeg and png files are allowed");
            }
        } else {
            setFieldValue("eventImage", "");
        }
    };
    useEffect(() => {
        let data = localStorage.getItem("event");
        if (data) {
          setNewEvent(JSON.parse(data));
        }
      }, []);
    return (
        <div className="page-information-container">
            <header className="page-header">
                <label>Upcoming Event</label>
            </header>
            <div className="createevent-container">
                <div className="createevent-header">
                    <Typography className="header-font" variant="body" gutterBottom>
                        Create a new event
                    </Typography>
                </div>
                <div className="form-line">
                    <Divider sx={{ borderBottomWidth: 2 }} />
                </div>
                <Formik
                    initialValues={{
                        eventDepartment: "",
                        eventTitle: "",
                        eventRSVP: "",
                        eventOrganizerName: "",
                        eventStartDate: null,
                        eventEndDate: null,
                        eventDescription: "",
                        eventImage: "",
                        eventVenue: ""
                    }}
                    validationSchema={ValidationSchema}
                    onSubmit={data => {
                        let event = {
                            id: Math.random(),
                            eventVenue: data.eventVenue,
                            eventTitle: data.eventTitle,
                            eventOrganizerName: data.eventOrganizerName,
                            eventDepartment: data.eventDepartment,
                            eventStartDate: data.eventStartDate,
                            eventEndDate: data.eventEndDate,
                            eventRSVP:data.eventRSVP,
                            eventDescription: data.eventDescription,
                            eventImage: data.eventImage,
                            time: Math.floor(Date.now() / 1000),
                            isDeleted: false,
                        }
                        newevent.push(event);
                        setNewEvent([...newevent]);
                        localStorage.setItem("event",JSON.stringify(newevent));
                        toast("Stored Successfully");
                        navigate.push("/upcomingevent");
                    }}
                >
                    {({ values, handleChange, handleBlur, errors, handleSubmit, touched, setFieldValue, setFieldError }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="createeventform">
                                <div className="formrow">
                                    <div className="createeventforminput">
                                        <TextField
                                            label="Event Title"
                                            name="eventTitle"
                                            type="eventTitle"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            variant="outlined"
                                            sx={{ width: 100 + "%" }}
                                        />
                                        <ValidationErrorMessage message={errors.eventTitle} touched={touched.eventTitle} />

                                    </div>
                                    <div className="createeventforminput">
                                    <TextField
                                            label="Event Organizer"
                                            name="eventOrganizerName"
                                            type="eventOrganizerName"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            variant="outlined"
                                            sx={{ width: 100 + "%" }}
                                        />
                                        <ValidationErrorMessage message={errors.eventOrganizerName} touched={touched.eventOrganizerName} />
                                    </div>
                                </div>
                                <div className="formrow">
                                    <div className="createeventforminput">
                                        <FormControl sx={{ width: 100 + "%" }}>
                                            <InputLabel id="demo-simple-select-autowidth-label">Department</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-autowidth-label"
                                                id="demo-simple-select-autowidth-label"
                                                name="eventDepartment"
                                                type="eventDepartment"
                                                label="Department"
                                                onChange={handleChange}
                                                value={values.eventDepartment}>
                                                <MenuItem value={"Department 1"}>Department 1</MenuItem>
                                                <MenuItem value={"Department 2"}>Department 2</MenuItem>
                                                <MenuItem value={"Department 3"}>Department 3</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <ValidationErrorMessage message={errors.eventDepartment} touched={touched.eventDepartment} />
                                    </div>
                                    <div className="createeventforminput">
                                    <TextField
                                            label="Event Venue"
                                            name="eventVenue"
                                            type="eventVenue"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            variant="outlined"
                                            sx={{ width: 100 + "%" }}
                                        />
                                        <ValidationErrorMessage message={errors.eventVenue} touched={touched.eventVenue} />
                                    </div>
                                </div>
                                <div className="formrow">
                                    <div className="createeventforminput">
                                        <DemoContainer required components={["DatePicker", "DatePicker"]}>
                                            <DatePicker
                                                label="Start Date"
                                                value={values.eventStartDate}
                                                required
                                                format="DD-MM-YYYY"
                                                sx={{ width: 100 + "%" }}
                                                onChange={(newValue) => setFieldValue("eventStartDate", newValue)}
                                                disablePast
                                            />
                                        </DemoContainer>
                                        <ValidationErrorMessage message={errors.eventStartDate} touched={touched.eventStartDate} />

                                    </div>
                                    <div className="createeventforminput">
                                        <DemoContainer required components={["DatePicker"]}>
                                            <DatePicker
                                                label="End Date"
                                                value={values.eventEndDate}
                                                required
                                                format="DD-MM-YYYY"
                                                sx={{ width: 100 + "%" }}
                                                onChange={(newValue) => setFieldValue("eventEndDate", newValue)}
                                                disablePast
                                            />
                                        </DemoContainer>
                                        <ValidationErrorMessage message={errors.eventEndDate} touched={touched.eventEndDate} />

                                    </div>
                                    <div className="createeventforminput">
                                        <FormControl sx={{ width: 100 + "%", marginTop: "1vh"}}>
                                            <InputLabel id="demo-simple-select-autowidth-label">RSVP</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-autowidth-label"
                                                id="demo-simple-select-autowidth-label"
                                                name="eventRSVP"
                                                type="eventRSVP"
                                                label="eventRSVP"
                                                onChange={handleChange}
                                                value={values.eventRSVP}>
                                                <MenuItem value={"YES"}>YES</MenuItem>
                                                <MenuItem value={"NO"}>No</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <ValidationErrorMessage message={errors.eventRSVP} touched={touched.eventRSVP} />

                                    </div>
                                </div>
                                <div className="formrow">
                                    <div className="createeventforminput">
                                        <TextField
                                            id="outlined-multiline-static"
                                            label="Event Description"
                                            multiline
                                            rows={4}
                                            name="eventDescription"
                                            type="eventDescription"
                                            variant="outlined"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            sx={{ width: 100 + "%" }}
                                        />
                                        <ValidationErrorMessage message={errors.eventDescription} touched={touched.eventDescription} />
                                    </div>
                                </div>
                                <div className="formrow">
                                    <div className="createeventforminput">
                                        <div className="form-col">
                                            {!values.eventImage && (
                                                <>
                                                    {" "}
                                                    <label
                                                        htmlFor="contained-button-file"
                                                        className="file-upload-btn"
                                                    >
                                                        <Input
                                                            id="contained-button-file"
                                                            type="file"
                                                            name="eventImage"
                                                            variant="outlined"
                                                            inputProps={{ className: "small" }}
                                                            onBlur={handleBlur}
                                                            onChange={(e) => {
                                                                onSelectFile(e, setFieldValue, setFieldError);
                                                            }}
                                                        />
                                                        <Button
                                                            variant="contained"
                                                            component="span"
                                                            className="btn pink-btn"
                                                        >
                                                            Upload
                                                        </Button>
                                                    </label>
                                                    <ValidationErrorMessage
                                                        message={errors.eventImage}
                                                        touched={touched.eventImage}
                                                    />
                                                </>
                                            )}
                                            {values.eventImage && (
                                                <div className="uploaded-file-name">
                                                    <em>
                                                        <img src={values.eventImage} className="img-upload" width="10rem" height="10rem" alt="" />
                                                    </em>
                                                    <Button
                                                        style={{ marginLeft: 2 + "rem" }}
                                                        variant="contained"
                                                        component="span"
                                                        color="error"
                                                        onClick={() => {
                                                            setFieldValue("eventImage", "");
                                                        }}
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="formrow">
                                    <div className="createeventforminput">
                                        <Button variant="contained" color="success" type="submit">
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )

}

export default Createupcomingevent;
