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
    const [allEmployeeGallery,setAllEmployeeGallery] = useState([]);
    const [employeeData, setEmployeeData] = useState({
        empGalleryTitle: "",
        empGalleryStartDate: "",
        empGalleryEndDate: "",
        empGalleryDescription: "",
        empGalleryImage: "",
    });
    const updateState = (e) => {
        setEmployeeData(existingValue => ({
            ...existingValue,
            empGalleryTitle: e[0]["empGalleryTitle"],
            empGalleryDescription: e[0]["empGalleryDescription"],
            empGalleryStartDate: e[0]["empGalleryStartDate"],
            empGalleryEndDate: e[0]["empGalleryEndDate"],
            empGalleryImage: e[0]["empGalleryImage"],
        })
        )

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
            console.log(employeeData);
        }
        catch (error) {
            console.log(error);
        }
    }, [])
    const navigate = useHistory();
    const ValidationSchema = Yup.object().shape({
        empGalleryTitle: Yup.string().required("Title is required"),
        empGalleryStartDate: Yup.string().required("Date is required"),
        empGalleryEndDate: Yup.string().required("Date is required"),
        empGalleryDescription: Yup.string().required("Event Description is required"),
        empGalleryImage: Yup.string().required("Image is required"),
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
                    setFieldValue("empGalleryImage", reader.result);
                };
                reader.onerror = function (error) {
                    throw error;
                };
            } else {
                toast.error("only jpg,jpeg and png files are allowed");
            }
        } else {
            setFieldValue("empGalleryImage", "");
        }
    };
    //Handles The Event when data is changed
    const UpdateData = (id, updatedData) => {
        const datawithId = newemployeegallery.find(e => e.id == id); // finds the element with id 
        if (datawithId["id"] === updatedData.id) {
            let temp = JSON.parse(localStorage.getItem("employeegallery"));
            let tempdata = newemployeegallery.indexOf(newemployeegallery.find(achievements => achievements.id == id));
            temp[tempdata] = updatedData
            setAllEmployeeGallery([...temp]);
        }
    }
    useEffect(()=>{
        if(allEmployeeGallery.length > 0)
        {
            localStorage.setItem("employeegallery",JSON.stringify(allEmployeeGallery));
            navigate.push("/admindashboard/employeegallery");
        }
    },[allEmployeeGallery])
    return (
        <div className="page-information-container">
            <header className="page-header">
                <label>Employee Gallery</label>
            </header>
            <div className="createbusinessgallery-container">
                <div className="createbusinessgallery-header">
                    <Typography className="header-font" variant="body" gutterBottom>
                        Update Employee Gallery
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
                        let employee ={
                            id: idParamVal,
                            empGalleryTitle: data.empGalleryTitle,
                            empGalleryStartDate: data.empGalleryStartDate,
                            empGalleryEndDate: data.empGalleryEndDate,
                            empGalleryDescription: data.empGalleryDescription,
                            empGalleryImage: data.empGalleryImage,
                            time: Math.floor(Date.now() / 1000),
                            isApproved : true,
                            isDeleted : false
                        }
                        UpdateData(idParamVal, employee);
                    }}
                >
                    {({ values, handleChange, handleBlur, errors, handleSubmit, touched, setFieldValue, setFieldError }) => (
                        <form onSubmit={handleSubmit}>
                        <div className="createemployeegalleryform">
                                <div className="formrow">

                                    <div className="createemployeegalleryforminput">
                                        <TextField
                                            label="Title"
                                            name="empGalleryTitle"
                                            type="empGalleryTitle"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            variant="outlined"
                                            sx={{ width: 100 + "%" }}
                                            value={values.empGalleryTitle}
                                        />
                                        <ValidationErrorMessage message={errors.empGalleryTitle} touched={touched.employeeGalleryTitle} />

                                    </div>
                                </div>

                                <div className="formrow">
                                    <div className="createemployeegalleryforminput">
                                    <DemoContainer  components={["DatePicker", "DatePicker"]}>
                                            <DatePicker
                                                label="End Date"
                                                value={dayjs(values.empGalleryStartDate)}
                                                required
                                                format="DD-MM-YYYY"
                                                sx={{ width: 100 + "%" }}
                                                onChange={(newValue) => setFieldValue("empGalleryStartDate", newValue)}
                                                
                                            />
                                        </DemoContainer>
                                        <ValidationErrorMessage message={errors.galleryEndDate} touched={touched.galleryEndDate} />
                                
                                    </div>
                                    <div className="createemployeegalleryforminput">
                                    <DemoContainer  components={["DatePicker", "DatePicker"]}>
                                            <DatePicker
                                                label="End Date"
                                                value={dayjs(values.empGalleryEndDate)}
                                                required
                                                format="DD-MM-YYYY"
                                                sx={{ width: 100 + "%" }}
                                                onChange={(newValue) => setFieldValue("empGalleryEndDate", newValue)}
    
                                            />
                                        </DemoContainer>
                                        <ValidationErrorMessage message={errors.empGalleryEndDate} touched={touched.empGalleryEndDate} />
                                    </div>
                                </div>
                                <div className="formrow">
                                    <div className="createemployeegalleryforminput">
                                        <TextField
                                            id="outlined-multiline-static"
                                            label="Description"
                                            multiline
                                            rows={4}
                                            name="empGalleryDescription"
                                            type="empGalleryDescription"
                                            variant="outlined"
                                            value={values.empGalleryDescription}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            sx={{ width: 100 + "%" }}
                                        />
                                        <ValidationErrorMessage message={errors.empGalleryDescription} touched={touched.empGalleryDescription} />
                                    </div>
                                </div>
                                <div className="formrow">
                                    <div className="createemployeegalleryforminput">
                                        <div className="form-col">
                                        {!values.empGalleryImage && (
                                                <>
                                                    {" "}
                                                    <label
                                                        htmlFor="contained-button-file"
                                                        className="file-upload-btn"
                                                    >
                                                        <Input
                                                            id="contained-button-file"
                                                            type="file"
                                                            name="empGalleryImage"
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
                                                        message={errors.empGalleryImage}
                                                        touched={touched.empGalleryImage}
                                                    />
                                                </>
                                            )}
                                            {values.empGalleryImage && (
                                                <div className="uploaded-file-name">
                                                    <em>
                                                        <img src={values.empGalleryImage} className="img-upload" width="10rem" height="10rem" alt="" />
                                                    </em>
                                                    <Button
                                                        style={{ marginLeft: 2 + "rem" }}
                                                        variant="contained"
                                                        component="span"
                                                        color="error"
                                                        onClick={() => {
                                                            setFieldValue("empGalleryImage", "");
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
                                    <div className="createemployeegalleryforminput">
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
