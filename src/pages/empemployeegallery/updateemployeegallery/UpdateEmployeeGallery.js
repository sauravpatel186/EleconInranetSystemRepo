import React from 'react'
import "./UpdateEmployeeGallery.css"
import { Link, useLocation, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { toast } from "react-toastify"
import { Divider, Input } from "@mui/material";
import { parseISO } from 'date-fns';
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import * as Yup from "yup";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import 'react-toastify/dist/ReactToastify.css';
import { ValidationErrorMessage } from "../../../components/ValidationErrorMessage/ValidationErrorMessage"
import { Formik } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useHistory } from "react-router-dom";
export const UpdateEmployeeGallery = () => {
    const [newemployeegallery, setNewEmployeeGallery] = useState([]);
    const { type } = useParams();
    const idParamVal = useLocation().state.idParam;
    const [employeeData, setEmployeeData] = useState({
        eventType: "",
        eventTitle: "",
        eventDate: "",
        eventDescription: "",
        achievementImage: ""
    });
    const updateState = (e) => {
        setEmployeeData(existingValue => ({
            ...existingValue,
            eventType: e[0]["eventType"],
            eventTitle: e[0]["eventTitle"],
            eventDescription: e[0]["eventDescription"],
            achievementImage: e[0]["achievementImage"],
        })
        )
        console.log(employeeData);
        console.log(parseISO("2023-04-06T18:30:00.000Z"));
    }
    const getEmployeeData = (id) => {
        let data = JSON.parse(localStorage.getItem("employeegallery"));
        if (data) {
            let adata = data.filter(employeegallery => employeegallery.id === id);
            updateState(adata);
            setNewEmployeeGallery(data);
        } else {
            return [];
        }
    }
    useEffect(() => {

        try {
            getEmployeeData(idParamVal)
        }
        catch (error) {
            console.log(error);
        }
    }, [])
    const navigate = useHistory();
    const ValidationSchema = Yup.object().shape({
        eventType: Yup.string().required("Please select an option"),
        eventTitle: Yup.string().required("Event Title is required"),
        eventDate: Yup.string().required("Event Date is required"),
        eventDescription: Yup.string().required("Event Description is required"),
        achievementImage: Yup.string().required("Image is required"),
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
                    setFieldValue("achievementImage", reader.result);
                };
                reader.onerror = function (error) {
                    throw error;
                };
            } else {
                toast.error("only jpg,jpeg and png files are allowed");
            }
        } else {
            setFieldValue("achievementImage", "");
        }
    };
    //Handles The Event when data is changed
    const UpdateData = (id, updatedData) => {
        const datawithId = newemployeegallery.find(e => e.id == id); // finds the element with id 
        if (datawithId["id"] === updatedData.id) {
            // /console.log(newachievement);
            setNewEmployeeGallery(result => [...result,updatedData]);
             console.log(newemployeegallery);
        }
        // setToDos([...toDos]) //updating the current state
        // localStorage.setItem("data", JSON.stringify(toDos)) //updating local storage with state
    }
    return (
        <div className="page-information-container">
            <header className="page-header">
                <label>Employee Gallery</label>
            </header>
            <div className="updateemployeegallery-container">
                <div className="updateemployeegallery-header">
                    <Typography className="header-font" variant="body" gutterBottom>
                        Update Business Gallery
                    </Typography>
                </div>
                <div className="form-line">
                    <Divider sx={{ borderBottomWidth: 2 }} />
                </div>
                <Formik
                    initialValues={employeeData}
                    validationSchema={ValidationSchema}
                    enableReinitialize
                    onSubmit={data => {
                        let achievement = {
                            id: idParamVal,
                            eventType: data.eventType,
                            eventTitle: data.eventTitle,
                            eventDate: JSON.stringify(data.eventDate),
                            eventDescription: data.eventDescription,
                            achievementImage: data.achievementImage,
                            time: Math.floor(Date.now() / 1000),
                            isDeleted: false,
                        }
                        UpdateData(idParamVal, achievement);
                    }}
                >
                    {({ values, handleChange, handleBlur, errors, handleSubmit, touched, setFieldValue, setFieldError }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="updateemployeegalleryform">
                                <div className="formrow">
                                    <div className="updateemployeegalleryforminput">
                                        <FormControl sx={{ width: 100 + "%" }}>
                                            <InputLabel id="demo-simple-select-autowidth-label">Achievement Type</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-autowidth-label"
                                                id="demo-simple-select-autowidth-label"
                                                name="eventType"
                                                type="eventType"
                                                label="Event Type"

                                                onChange={handleChange}
                                                value={values.eventType}>
                                                <MenuItem value={"Event Type 1"}>Event Type 1</MenuItem>
                                                <MenuItem value={"Event Type 2"}>Event Type 2</MenuItem>
                                                <MenuItem value={"Event Type 3"}>Event Type 3</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <ValidationErrorMessage message={errors.achievementType} touched={touched.achievementType} />
                                    </div>
                                    <div className="updateemployeegalleryforminput">
                                        <TextField
                                            label="Event Title"
                                            name="eventTitle"
                                            type="eventTitle"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.eventTitle}
                                            variant="outlined"
                                            sx={{ width: 100 + "%" }}
                                        />
                                        <ValidationErrorMessage message={errors.achievementTitle} touched={touched.achievementTitle} />

                                    </div>
                                </div>
                                <div className="formrow">
                                    
                                    <div className="updateemployeegalleryforminput">
                                        <DemoContainer required components={["DatePicker", "DatePicker"]}>
                                            <DatePicker
                                                label="Event Date"
                                                value={dayjs(parseISO(values.achievementStartDate))}
                                                required
                                                format="DD-MM-YYYY"
                                                defaultValue={dayjs(parseISO(values.achievementStartDate))}
                                                sx={{ width: 100 + "%" }}
                                                onChange={(newValue) => setFieldValue("eventDate", newValue)}
                                                
                                            />
                                        </DemoContainer>
                                        <ValidationErrorMessage message={errors.eventDate} touched={touched.eventDate} />

                                    </div>
                                    
                                </div>
                                <div className="formrow">
                                    <div className="updateemployeegalleryforminput">
                                        <TextField
                                            id="outlined-multiline-static"
                                            label="Event Description"
                                            multiline
                                            rows={4}
                                            value={values.eventDescription}
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
                                    <div className="updateemployeegalleryforminput">
                                        <div className="form-col">
                                            {!values.achievementImage && (
                                                <>
                                                    {" "}
                                                    <label
                                                        htmlFor="contained-button-file"
                                                        className="file-upload-btn"
                                                    >
                                                        <Input
                                                            id="contained-button-file"
                                                            type="file"
                                                            name="achievementImage"
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
                                                        message={errors.achievementImage}
                                                        touched={touched.achievementImage}
                                                    />
                                                </>
                                            )}
                                            {values.achievementImage && (
                                                <div className="uploaded-file-name">
                                                    <em>
                                                        <img src={values.achievementImage} className="img-upload" width="10rem" height="10rem" alt="" />
                                                    </em>
                                                    <Button
                                                        style={{ marginLeft: 2 + "rem" }}
                                                        variant="contained"
                                                        component="span"
                                                        color="error"
                                                        onClick={() => {
                                                            setFieldValue("achievementImage", "");
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
                                    <div className="updateemployeegalleryforminput">
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
