import * as React from "react";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./CreateBusinessGallery.css";
import { toast } from "react-toastify"
import { Divider, Input } from "@mui/material";
import dayjs from "dayjs";

import * as Yup from "yup";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import 'react-toastify/dist/ReactToastify.css';
import { ValidationErrorMessage } from "../../../components/ValidationErrorMessage/ValidationErrorMessage"
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import { BusinessGallery } from "../BusinessGallery";
export const CreateBusinessGallery = () => {

    const navigate = useHistory();
    const [newbusinessgallery, setNewBusinessGallery] = useState([]);
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
    useEffect(() => {
        let data = localStorage.getItem("businessgallery");
        if (data) {
            setNewBusinessGallery(JSON.parse(data));
        }
    }, []);
    return (
        <div className="page-information-container">
            <header className="page-header">
                <label>Business Gallery</label>
            </header>
            <div className="createbusinessgallery-container">
                <div className="createbusinessgallery-header">
                    <Typography className="header-font" variant="body" gutterBottom>
                        Create a new Business Gallery
                    </Typography>
                </div>
                <div className="form-line">
                    <Divider sx={{ borderBottomWidth: 2 }} />
                </div>
                <Formik
                    initialValues={{
                        galleryTitle: "",
                        galleryStartDate: null,
                        galleryEndDate: null,
                        galleryDescription: "",
                        galleryImage: "",
                    }}
                    validationSchema={ValidationSchema}
                    onSubmit={data => {
                        let event = {
                            id: Math.random(),
                            galleryTitle: data.galleryTitle,
                            galleryStartDate: data.galleryStartDate,
                            galleryEndDate: data.galleryEndDate,
                            galleryDescription: data.galleryDescription,
                            galleryImage: data.galleryImage,
                            time: Math.floor(Date.now() / 1000),
                            isDeleted: false,
                            isApproved: true,
                        }
                        newbusinessgallery.push(event);
                        setNewBusinessGallery([...newbusinessgallery]);
                        localStorage.setItem("businessgallery", JSON.stringify(newbusinessgallery));
                        toast("Stored Successfully");
                        // console.log(JSON.stringify(achievement));
                        // submitData(achievement);
                        navigate.push("/businessgallery");
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
                                        />
                                        <ValidationErrorMessage message={errors.galleryTitle} touched={touched.galleryTitle} />

                                    </div>
                                </div>

                                <div className="formrow">
                                    <div className="createemployeegalleryforminput">
                                    <DemoContainer required components={["DatePicker", "DatePicker"]}>
                                            <DatePicker
                                                label="Start Date"
                                                value={values.galleryStartDate}
                                                required
                                                format="DD-MM-YYYY"
                                                sx={{ width: 100 + "%" }}
                                                onChange={(newValue) => setFieldValue("galleryStartDate", newValue)}
                                                disablePast
                                            />
                                        </DemoContainer>
                                        <ValidationErrorMessage message={errors.galleryStartDate} touched={touched.galleryStartDate} />

                                    </div>
                                    <div className="createemployeegalleryforminput">
                                    <DemoContainer required components={["DatePicker", "DatePicker"]}>
                                            <DatePicker
                                                label="End Date"
                                                value={values.galleryEndDate}
                                                required
                                                format="DD-MM-YYYY"
                                                sx={{ width: 100 + "%" }}
                                                onChange={(newValue) => setFieldValue("galleryEndDate", newValue)}
                                                disablePast
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
