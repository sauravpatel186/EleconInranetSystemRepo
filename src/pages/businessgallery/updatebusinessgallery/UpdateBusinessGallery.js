import React from 'react'
import "./UpdateBusinessGallery.css"
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
export const UpdateBusinessGallery = () => {
    const [newbusinessgallery, setNewBusinessGallery] = useState([]);
    const { type } = useParams();
    const idParamVal = useLocation().state.idParam;
    const [galleryData, setGalleryData] = useState({
        galleryTitle: "",
        galleryStartDate: "",
        galleryEndDate: "",
        galleryDescription: "",
        galleryImage: "",
    });
    const updateState = (e) => {
        setGalleryData(existingValue => ({
            ...existingValue,
            galleryTitle:e[0]["galleryTitle"],
            galleryStartDate:e[0]["galleryStartDate"],
            galleryEndDate:e[0]["galleryEndDate"],
            galleryImage:e[0]["galleryImage"],
            galleryDescription:e[0]["galleryDescription"]
        })
        )
        console.log(galleryData);
        console.log(parseISO("2023-04-06T18:30:00.000Z"));
    }
    const getGalleryData = (id) => {
        let data = JSON.parse(localStorage.getItem("businessgallery"));
        if (data) {
            let adata = data.filter(businessgallery => businessgallery.id === id);
            updateState(adata);
            setNewBusinessGallery(data);
        } else {
            return [];
        }
    }
    useEffect(() => {

        try {
            getGalleryData(idParamVal)
        }
        catch (error) {
            console.log(error);
        }
    }, [])
    const navigate = useHistory();
    const ValidationSchema = Yup.object().shape({
        galleryTitle: Yup.string().required("Title is required"),
        galleryStartDate: Yup.string().required("Date is required"),
        galleryEndDate: Yup.string().required("Date is required"),
        galleryDescription: Yup.string().required("Event Description is required"),
        galleryImage: Yup.string().required("Image is required"),
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
                    setFieldValue("galleryImage", reader.result);
                };
                reader.onerror = function (error) {
                    throw error;
                };
            } else {
                toast.error("only jpg,jpeg and png files are allowed");
            }
        } else {
            setFieldValue("galleryImage", "");
        }
    };
    //Handles The Event when data is changed
    const UpdateData = (id, updatedData) => {
        const datawithId = newbusinessgallery.find(e => e.id == id); // finds the element with id 
        if (datawithId["id"] === updatedData.id) {
            // /console.log(newachievement);
            setNewBusinessGallery(result => [...result, updatedData]);
            console.log(newbusinessgallery);
        }
        // setToDos([...toDos]) //updating the current state
        // localStorage.setItem("data", JSON.stringify(toDos)) //updating local storage with state
    }
    return (
        <div className="page-information-container">
            <header className="page-header">
                <label>Business Gallery</label>
            </header>
            <div className="createbusinessgallery-container">
                <div className="createbusinessgallery-header">
                    <Typography className="header-font" variant="body" gutterBottom>
                        Update Business Gallery
                    </Typography>
                </div>
                <div className="form-line">
                    <Divider sx={{ borderBottomWidth: 2 }} />
                </div>
                <Formik
                    initialValues={galleryData}
                    validationSchema={ValidationSchema}
                    enableReinitialize
                    onSubmit={data => {
                        let achievement = {
                            id: Math.random(),
                            galleryTitle: data.galleryTitle,
                            galleryStartDate: data.galleryStartDate,
                            galleryEndDate: data.galleryEndDate,
                            galleryDescription: data.galleryDescription,
                            galleryImage: data.galleryImage,
                            
                        }
                        UpdateData(idParamVal, achievement);
                    }}
                >
                    {({ values, handleChange, handleBlur, errors, handleSubmit, touched, setFieldValue, setFieldError }) => (
                        <form onSubmit={handleSubmit}>
                        <div className="createemployeegalleryform">
                                <div className="formrow">

                                    <div className="createemployeegalleryforminput">
                                        <TextField
                                            label="Title"
                                            name="galleryTitle"
                                            type="galleryTitle"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            variant="outlined"
                                            sx={{ width: 100 + "%" }}
                                            value={values.galleryTitle}
                                        />
                                        <ValidationErrorMessage message={errors.galleryTitle} touched={touched.galleryTitle} />

                                    </div>
                                </div>

                                <div className="formrow">
                                    <div className="createemployeegalleryforminput">
                                    <DemoContainer required components={["DatePicker", "DatePicker"]}>
                                            <DatePicker
                                                label="Start Date"
                                                value={dayjs(values.galleryStartDate)}
                                                
                                                format="DD-MM-YYYY"
                                                sx={{ width: 100 + "%" }}
                                                onChange={(newValue) => setFieldValue("galleryStartDate", newValue)}
                                                
                                            />
                                        </DemoContainer>
                                        <ValidationErrorMessage message={errors.galleryStartDate} touched={touched.galleryStartDate} />

                                    </div>
                                    <div className="createemployeegalleryforminput">
                                    <DemoContainer  components={["DatePicker", "DatePicker"]}>
                                            <DatePicker
                                                label="End Date"
                                                value={dayjs(values.galleryEndDate)}
                                                required
                                                format="DD-MM-YYYY"
                                                sx={{ width: 100 + "%" }}
                                                onChange={(newValue) => setFieldValue("galleryEndDate", newValue)}
                                                
                                            />
                                        </DemoContainer>
                                        <ValidationErrorMessage message={errors.galleryEndDate} touched={touched.galleryEndDate} />
                                    </div>
                                </div>
                                <div className="formrow">
                                    <div className="createemployeegalleryforminput">
                                        <TextField
                                            id="outlined-multiline-static"
                                            label="Description"
                                            multiline
                                            rows={4}
                                            name="galleryDescription"
                                            type="galleryDescription"
                                            variant="outlined"
                                            value={values.galleryDescription}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            sx={{ width: 100 + "%" }}
                                        />
                                        <ValidationErrorMessage message={errors.galleryDescription} touched={touched.galleryDescription} />
                                    </div>
                                </div>
                                <div className="formrow">
                                    <div className="createemployeegalleryforminput">
                                        <div className="form-col">
                                        {!values.galleryImage && (
                                                <>
                                                    {" "}
                                                    <label
                                                        htmlFor="contained-button-file"
                                                        className="file-upload-btn"
                                                    >
                                                        <Input
                                                            id="contained-button-file"
                                                            type="file"
                                                            name="galleryImage"
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
                                                        message={errors.galleryImage}
                                                        touched={touched.galleryImage}
                                                    />
                                                </>
                                            )}
                                            {values.galleryImage && (
                                                <div className="uploaded-file-name">
                                                    <em>
                                                        <img src={values.galleryImage} className="img-upload" width="10rem" height="10rem" alt="" />
                                                    </em>
                                                    <Button
                                                        style={{ marginLeft: 2 + "rem" }}
                                                        variant="contained"
                                                        component="span"
                                                        color="error"
                                                        onClick={() => {
                                                            setFieldValue("galleryImage", "");
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
