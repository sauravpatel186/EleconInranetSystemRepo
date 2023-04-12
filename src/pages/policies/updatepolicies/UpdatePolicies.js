import React from 'react'
import "./UpdatePolicies.css"
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
export const UpdatePolicies = () => {
    const [newpolicies, setNewPolicies] = useState([]);
    const { type } = useParams();
    const idParamVal = useLocation().state.idParam;
    const [policiesData, setPoliciesData] = useState({
        // policiesType: "",
        policiesTitle: "",
        // employeeIdandName: "",
        policiesArea: "",
        policiesStartDate: "",
        policiesEndDate: "",
        policiesDescription: "",
        policiesImage: ""
    });
    const updateState = (e) => {
        setPoliciesData(existingValue => ({
            ...existingValue,
            // policiesType: e[0]["policiesType"],
            policiesTitle: e[0]["policiesTitle"],
            // employeeIdandName: e[0]["employeeIdandName"],
            policiesArea: e[0]["policiesArea"],
            polciesDescription: e[0]["policiesDescription"],
            policiesEndDate: e[0]["policiesEndDate"],
            policiesImage: e[0]["policiesImage"],
            policiesStartDate: e[0]["policiesStartDate"]
        })
        )
        console.log(policiesData);
        console.log(parseISO("2023-04-06T18:30:00.000Z"));
    }
    const getPoliciesData = (id) => {
        let data = JSON.parse(localStorage.getItem("policies"));
        if (data) {
            let adata = data.filter(policiess => policiess.id === id);
            updateState(adata);
            setNewPolicies(data);
        } else {
            return [];
        }
    }
    useEffect(() => {

        try {
            getPoliciesData(idParamVal)
        }
        catch (error) {
            console.log(error);
        }
    }, [])
    const navigate = useHistory();
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
    //Handles The Event when data is changed
    const UpdateData = (id, updatedData) => {
        const datawithId = newpolicies.find(e => e.id == id); // finds the element with id 
        if (datawithId["id"] === updatedData.id) {
            // /console.log(newachievement);
            setNewPolicies(result => [...result,updatedData]);
             console.log(newpolicies);
        }
        // setToDos([...toDos]) //updating the current state
        // localStorage.setItem("data", JSON.stringify(toDos)) //updating local storage with state
    }
    return (
        <div className="page-information-container">
            <header className="page-header">
                <label>Policies</label>
            </header>
            <div className="createpolicies-container">
                <div className="createpolicies-header">
                    <Typography className="header-font" variant="body" gutterBottom>
                        Update policies
                    </Typography>
                </div>
                <div className="form-line">
                    <Divider sx={{ borderBottomWidth: 2 }} />
                </div>
                <Formik
                    initialValues={policiesData}
                    validationSchema={ValidationSchema}
                    enableReinitialize
                    onSubmit={data => {
                        let policies = {
                            id: idParamVal,
                            // policiesType: data.policiesType,
                            policiesTitle: data.policiesTitle,
                            // employeeIdandName: data.employeeIdandName,
                            policiesArea: data.policiesArea,
                            policiesStartDate: JSON.stringify(data.policiesStartDate),
                            policiesEndDate: JSON.stringify(data.policiesEndDate),
                            policiesDescription: data.policiesDescription,
                            policiesImage: data.policiesImage,
                            time: Math.floor(Date.now() / 1000),
                            isDeleted: false,
                        }
                        UpdateData(idParamVal, policies);
                    }}
                >
                    {({ values, handleChange, handleBlur, errors, handleSubmit, touched, setFieldValue, setFieldError }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="createpoliciesform">
                                <div className="formrow">
                                    {/* <div className="createpolicesforminput">
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
                                            value={values.policiesTitle}
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
                                                label="Policy/Manual"
                                                onChange={handleChange}
                                                value={values.achievementArea}>
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
                                                value={dayjs(parseISO(values.policiesStartDate))}
                                                required
                                                format="DD-MM-YYYY"
                                                defaultValue={dayjs(parseISO(values.policiesStartDate))}
                                                sx={{ width: 100 + "%" }}
                                                onChange={(newValue) => setFieldValue("policiesStartDate", newValue)}
                                                
                                            />
                                        </DemoContainer>
                                        <ValidationErrorMessage message={errors.policiesStartDate} touched={touched.policiesStartDate} />

                                    </div>
                                    <div className="createpoliciesforminput">
                                        <DemoContainer required components={["DatePicker"]}>
                                            <DatePicker
                                                label="Revised Date"
                                                value={dayjs(parseISO(values.policiesEndDate))}
                                                required
                                                format="DD-MM-YYYY"
                                                sx={{ width: 100 + "%" }}
                                                defaultValue={dayjs(values.policiesEndDate)}
                                                onChange={(newValue) => setFieldValue("policiesEndDate", newValue)}
                                        
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
                                            value={values.policiesDescription}
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
export default UpdatePolicies