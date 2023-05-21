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
import { ValidationErrorMessage } from "../../../../src/components/ValidationErrorMessage/ValidationErrorMessage"
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
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import companyList from "../../../assets/data/companyanddepartment";
const showToastMessage = () => {
    toast.success('Success Notification !', {
        position: toast.POSITION.TOP_RIGHT
    });
};

const Createupcomingevent = () => {
    const navigate = useHistory();
    const [newevent, setNewEvent] = useState([]);
    const ValidationSchema = Yup.object().shape({
        eventTitle: Yup.string().required("Event Title is required."),
        eventDepartment: Yup.string().required("Event department is required."),
        eventRSVP: Yup.string().required("Event RSVP is required."),
        eventOrganizerName: Yup.string().required("Event organizer name is required."),
        eventVenue: Yup.string().required("Event venue is required."),
        eventStartDate: Yup.string().required("Start Date is required"),
        eventEndDate: Yup.string().required("End Date is required"),
        eventDescription: Yup.string().required("Event Description is required"),
        eventImage: Yup.string().nullable(),
        eventCompany: Yup.string().required("Company is required"),
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
    const [department, setDepartment] = useState([]);
    const onSelectCompany = (e, setFieldValue, setFieldError) => {
        const company = e.target.value;
        setFieldValue("eventCompany", company);
        setDepartment(companyList.filter(c => c.CompanyName == company)[0].DepartmentName);
    }
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
            <div className='page-breadscrumb'>
                <br />
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/" exact to="/admindashboard">
                        Home
                    </Link>
                    <Link
                        underline="hover" color="inherit" href="/admindashboard/upcomingevent" exact to="/admindashboard/upcomingevent">
                        Upcoming Event
                    </Link>
                    <Link
                        underline="hover"
                        color="text.primary"
                        href="/admindashboard/upcomingevent/createupcomingevent"
                        aria-current="page">
                        Create Upcoming Event
                    </Link>
                </Breadcrumbs>
            </div>
            <div className="createupcomingevent-container">
                <div className="createupcomingevent-header">
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
                        eventVenue: "",
                        eventCompany:"",
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
                            eventRSVP: data.eventRSVP,
                            eventDescription: data.eventDescription,
                            eventImage: data.eventImage,
                            eventCompany: data.eventCompany,
                            time: Math.floor(Date.now() / 1000),
                            isDeleted: false,
                        }
                        newevent.push(event);
                        setNewEvent([...newevent]);
                        localStorage.setItem("event", JSON.stringify(newevent));
                        toast("Stored Successfully");
                        navigate.push("/admindashboard/upcomingevent");
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
                                        <FormControl sx={{ width: 100 + "%", marginTop: "1vh" }}>
                                            <InputLabel id="demo-simple-select-autowidth-label">Company</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-autowidth-label"
                                                id="demo-simple-select-autowidth-label"
                                                name="eventCompany"
                                                type="eventCompany"
                                                label="Company"
                                                onChange={(e) =>
                                                    onSelectCompany(e, setFieldValue, setFieldError)
                                                }
                                                value={values.eventCompany}>
                                                {
                                                    companyList.map((company) => {
                                                        return (
                                                            <MenuItem key={company} value={company.CompanyName}>{company.CompanyName}</MenuItem>
                                                        )
                                                    })
                                                }

                                            </Select>
                                        </FormControl>
                                        <ValidationErrorMessage message={errors.eventCompany} touched={touched.eventCompany} />
                                    </div>
                                    <div className="createeventforminput">
                                        <FormControl sx={{ width: 100 + "%", marginTop: "1vh" }}>
                                            <InputLabel id="demo-simple-select-autowidth-label">Department</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-autowidth-label"
                                                id="demo-simple-select-autowidth-label"
                                                name="eventDepartment"
                                                type="eventDepartment"
                                                label="Department"
                                                onChange={handleChange}
                                                value={values.eventDepartment}>
                                                {
                                                    department &&


                                                    department.map((dep) => {
                                                        return (
                                                            <MenuItem value={dep} key={dep}>{dep}</MenuItem>
                                                        )
                                                    })



                                                }
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
                                                value={(values.eventStartDate)}
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
                                                value={(values.eventEndDate)}
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
                                        <FormControl sx={{ width: 100 + "%", marginTop: "1vh" }}>
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
                                                <MenuItem value={"NO"}>NO</MenuItem>
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
