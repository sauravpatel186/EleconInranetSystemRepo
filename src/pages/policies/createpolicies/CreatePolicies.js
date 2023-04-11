import * as React from "react";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./CreatePolicies.css";
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
import { Policies } from "../Policies";
import {   Breadcrumbs, Link, Checkbox, Paper, tableCellClasses, TableContainer, Table, TableHead, TableBody, TableCell, TableRow, TablePagination } from '@mui/material'
export const CreatePolicies = () => {
    
    const navigate = useHistory();
    const [newpolicies,setNewPolicies]=useState([]);
    const ValidationSchema = Yup.object().shape({
        // policiesType: Yup.string().required("Please select an option"),
        policiesTitle: Yup.string().required("Policies Title is required"),
        // employeeIdandName: Yup.string().required("Please select an option"),
        policiesArea: Yup.string().required("Please select an option"),
        policiesStartDate: Yup.string().required("Start Date is required"),
        policiesEndDate: Yup.string().required("End Date is required"),
        policiesDescription: Yup.string().required("Policies Description is required"),
        policiesImage: Yup.string().required("Image is required"),
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
                    setFieldValue("policiesImage", reader.result);
                };
                reader.onerror = function (error) {
                    throw error;
                };
            } else {
                toast.error("only jpg,jpeg and png files are allowed");
            }
        } else {
            setFieldValue("policiesImage", "");
        }
    };
    useEffect(() => {
        let data = localStorage.getItem("policies");
        if (data) {
          setNewPolicies(JSON.parse(data));
        }
      }, []);
    return (
        <div className="page-information-container">
            <header className="page-header">
                <label>Policies</label>
            </header>
            <div className="createpolicies-container">
                <div className="createpolicies-header">
                    <Typography className="header-font" variant="body" gutterBottom>
                        Create a new policies
                    </Typography>
                </div>
                <div className="form-line">
                    <Divider sx={{ borderBottomWidth: 2 }} />
                </div>
                <Formik
                    initialValues={{
                        // policiesType: "",
                        policiesTitle: "",
                        // employeeIdandName: "",
                        policiesArea: "",
                        policiesStartDate: null,
                        policiesEndDate: null,
                        policiesDescription: "",
                        policiesImage: ""
                    }}
                    validationSchema={ValidationSchema}
                    onSubmit={data => {
                        let policies = {
                            id: Math.random(),
                            // policiesType: data.policiesType,
                            policiesTitle: data.policiesTitle,
                            // employeeIdandName: data.employeeIdandName,
                            policiesArea: data.policiesArea,
                            policiesStartDate: data.policiesStartDate,
                            policiesEndDate: data.policiesEndDate,
                            policiesDescription: data.policiesDescription,
                            policiesImage: data.policiesImage,
                            time: Math.floor(Date.now() / 1000),
                            isDeleted: false,
                        }
                        newpolicies.push(policies);
                        setNewPolicies([...newpolicies]);
                        localStorage.setItem("policies",JSON.stringify(newpolicies));
                        toast("Stored Successfully");
                        // console.log(JSON.stringify(achievement));
                        // submitData(achievement);
                        navigate.push("/policies");
                    }}
                >
                    {({ values, handleChange, handleBlur, errors, handleSubmit, touched, setFieldValue, setFieldError }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="createpoliciesform">
                                <div className="formrow">
                                     {/* <div className="createpoliciesforminput">
                                        <FormControl sx={{ width: 100 + "%" }}>
                                            <InputLabel id="demo-simple-select-autowidth-label">Policies Type</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-autowidth-label"
                                                id="demo-simple-select-autowidth-label"
                                                name="policiesType"
                                                type="policiesType"
                                                label="Policies Type"
                                                onChange={handleChange}
                                                value={values.policiesType}>
                                                <MenuItem value={"Policies Type 1"}>Policies Type 1</MenuItem>
                                                <MenuItem value={"Policies Type 2"}>Policies Type 2</MenuItem>
                                                <MenuItem value={"Policies Type 3"}>Policies Type 3</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <ValidationErrorMessage message={errors.policiesType} touched={touched.policiesType} />
                                    </div>  */}
                                    <div className="createpoliciesforminput">
                                        <TextField
                                            label="Policies Title"
                                            name="policiesTitle"
                                            type="policiesTitle"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            variant="outlined"
                                            sx={{ width: 100 + "%" }}
                                        />
                                        <ValidationErrorMessage message={errors.policiesTitle} touched={touched.policiesTitle} />

                                    </div>
                                </div>
                                {/* <div className="formrow">
                                    <div className="createpoliciesforminput">
                                        <FormControl sx={{ width: 100 + "%" }}>
                                            <InputLabel id="demo-simple-select-autowidth-label">Employee Id and Name</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-autowidth-label"
                                                id="demo-simple-select-autowidth-label"
                                                name="employeeIdandName"
                                                type="employeeIdandName"
                                                label="employeeIdandName"
                                                onChange={handleChange}
                                                value={values.employeeIdandName}>
                                                <MenuItem value={"Policies Type 1"}>Policies Type 1</MenuItem>
                                                <MenuItem value={"Policies Type 2"}>Policies Type 2</MenuItem>
                                                <MenuItem value={"Policies Type 3"}>Policies Type 3</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <ValidationErrorMessage message={errors.employeeIdandName} touched={touched.employeeIdandName} />

                                    </div>
                                </div> */}
                                <div className="formrow">
                                        <div className="createpoliciesforminput">
                                        <FormControl sx={{ width: 100 + "%", marginTop: 1 + "vh" }}>
                                            <InputLabel id="demo-simple-select-autowidth-label">Policies Area</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-autowidth-label"
                                                id="demo-simple-select-autowidth-label"
                                                name="policiesArea"
                                                type="policiesArea"
                                                label="policy/Manual"
                                                onChange={handleChange}
                                                value={values.policiesArea}>
                                                <MenuItem value={"Policies Type 1"}>Policy</MenuItem>
                                                <MenuItem value={"Policies Type 2"}>Manual</MenuItem>
                                                {/* <MenuItem value={"Policies Type 3"}>Policies Type 3</MenuItem> */}
                                            </Select>
                                        </FormControl>

                                        <ValidationErrorMessage message={errors.policiesArea} touched={touched.policiesArea} />
                                    </div>  
                                    <div className="createpoliciesforminput">
                                        <DemoContainer required components={["DatePicker", "DatePicker"]}>
                                            <DatePicker
                                                label="Creation Date"
                                                value={values.policiesStartDate}
                                                required
                                                format="DD-MM-YYYY"
                                                sx={{ width: 100 + "%" }}
                                                onChange={(newValue) => setFieldValue("policiesStartDate", newValue)}
                                                disablePast
                                            />
                                        </DemoContainer>
                                        <ValidationErrorMessage message={errors.policiesStartDate} touched={touched.policiesStartDate} />

                                    </div> 
                                    <div className="createpoliciesforminput">
                                        <DemoContainer required components={["DatePicker"]}>
                                            <DatePicker
                                                label="Revised Date"
                                                value={values.policiesEndDate}
                                                required
                                                format="DD-MM-YYYY"
                                                sx={{ width: 100 + "%" }}
                                                onChange={(newValue) => setFieldValue("policiesEndDate", newValue)}
                                                disablePast
                                            />
                                        </DemoContainer>
                                        <ValidationErrorMessage message={errors.policiesEndDate} touched={touched.policiesEndDate} />

                                    </div>
                                </div>
                                <div className="formrow">
                                    <div className="createpoliciesforminput">
                                        <TextField
                                            id="outlined-multiline-static"
                                            label="Policies Description"
                                            multiline
                                            rows={4}
                                            name="policiesDescription"
                                            type="policiesDescription"
                                            variant="outlined"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            sx={{ width: 100 + "%" }}
                                        />
                                        <ValidationErrorMessage message={errors.policiesDescription} touched={touched.policiesDescription} />
                                    </div>
                                </div>
                                <div className="formrow">
                                    <div className="createpoliciesforminput">
                                        <div className="form-col">
                                            {!values.policiesImage && (
                                                <>
                                                    {" "}
                                                    <label
                                                        htmlFor="contained-button-file"
                                                        className="file-upload-btn"
                                                    >
                                                        <Input
                                                            id="contained-button-file"
                                                            type="file"
                                                            name="policiesImage"
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
                                                        message={errors.policiesImage}
                                                        touched={touched.policiesImage}
                                                    />
                                                </>
                                            )}
                                            {values.policiesImage && (
                                                <div className="uploaded-file-name">
                                                    <em>
                                                        <img src={values.policiesImage} className="img-upload" width="10rem" height="10rem" alt="" />
                                                    </em>
                                                    <Button
                                                        style={{ marginLeft: 2 + "rem" }}
                                                        variant="contained"
                                                        component="span"
                                                        color="error"
                                                        onClick={() => {
                                                            setFieldValue("policiesImage", "");
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
                                    <div className="createpoliciesforminput">
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
export default CreatePolicies

