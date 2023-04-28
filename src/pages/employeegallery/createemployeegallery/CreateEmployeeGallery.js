import * as React from "react";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./CreateEmployeeGallery.css";
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
import { EmployeeGallery } from "../EmployeeGallery";
export const CreateEmployeeGallery = () => {

    const navigate = useHistory();
    const [newemployeegallery, setNewEmployeeGallery] = useState([]);
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
    useEffect(() => {
        let data = localStorage.getItem("employeegallery");
        if (data) {
            setNewEmployeeGallery(JSON.parse(data));
        }
    }, []);
    return (
        <div className="page-information-container">
            <header className="page-header">
                <label>Employee Gallery</label>
            </header>
            <div className="createemployeegallery-container">
                <div className="createemployeegallery-header">
                    <Typography className="header-font" variant="body" gutterBottom>
                        Create a new Employee Gallery
                    </Typography>
                </div>
                <div className="form-line">
                    <Divider sx={{ borderBottomWidth: 2 }} />
                </div>
                <Formik
                    initialValues={{
                        empGalleryTitle: "",
                        empGalleryStartDate: null,
                        empGalleryEndDate: null,
                        empGalleryDescription: "",
                        empGalleryImage: "",
                    }}
                    validationSchema={ValidationSchema}
                    onSubmit={data => {
                        let employeeGalley = {
                            id: Math.random(),
                            empGalleryTitle: data.empGalleryTitle,
                            empGalleryStartDate: data.empGalleryStartDate,
                            empGalleryEndDate: data.empGalleryEndDate,
                            empGalleryDescription: data.empGalleryDescription,
                            empGalleryImage: data.empGalleryImage,
                            time: Math.floor(Date.now() / 1000),
                            isDeleted: false,
                            isApproved: true,
                        }
                        // console.log(employeeGalley);
                        newemployeegallery.push(employeeGalley);
                        setNewEmployeeGallery([...newemployeegallery]);
                        localStorage.setItem("employeegallery", JSON.stringify(newemployeegallery));
                        toast("Stored Successfully");
                        // console.log(JSON.stringify(achievement));
                        // submitData(achievement);
                        navigate.push("/admindashboard/employeegallery");
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
                                        />
                                        <ValidationErrorMessage message={errors.empGalleryTitle} touched={touched.empGalleryTitle} />

                                    </div>
                                </div>

                                <div className="formrow">
                                    <div className="createemployeegalleryforminput">
                                    <DemoContainer required components={["DatePicker", "DatePicker"]}>
                                            <DatePicker
                                                label="Start Date"
                                                value={values.empGalleryStartDate}
                                                required
                                                format="DD-MM-YYYY"
                                                sx={{ width: 100 + "%" }}
                                                onChange={(newValue) => setFieldValue("empGalleryStartDate", newValue)}
                                                disablePast
                                            />
                                        </DemoContainer>
                                        <ValidationErrorMessage message={errors.empGalleryStartDate} touched={touched.empGalleryStartDate} />

                                    </div>
                                    <div className="createemployeegalleryforminput">
                                    <DemoContainer required components={["DatePicker", "DatePicker"]}>
                                            <DatePicker
                                                label="End Date"
                                                value={values.empGalleryEndDate}
                                                required
                                                format="DD-MM-YYYY"
                                                sx={{ width: 100 + "%" }}
                                                onChange={(newValue) => setFieldValue("empGalleryEndDate", newValue)}
                                                disablePast
                                            />
                                        </DemoContainer>
                                        <ValidationErrorMessage message={errors.empGalleryEndDate} touched={touched.empGalleryEndDate} />
                                    </div>
                                </div>
                                <div className="formrow">
                                    <div className="createemployeegalleryforminput">
                                        <TextField
                                            id="outlined-multiline-static"
                                            label="Event Description"
                                            multiline
                                            rows={4}
                                            name="empGalleryDescription"
                                            type="empGalleryDescription"
                                            variant="outlined"
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
