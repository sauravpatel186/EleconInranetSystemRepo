import React from 'react'
import "./UpdateCeomessage.css"
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
export const UpdateCeomessage = () => {
    const [newceomessage, setNewCeomessage] = useState([]);
    const [allceomessage, setAllCeomessage] = useState([]);
    const { type } = useParams();
    const idParamVal = useLocation().state.idParam;
    const [ceomessageData, setCeomessageData] = useState({
        // ceomessageType: "",
        ceomessageTitle: "",
        // employeeIdandName: "",
        // ceomessageArea: "",
        ceomessageStartDate: "",
        ceomessageEndDate: "",
        ceomessageDescription: "",
        ceomessageImage: ""
    });
    const updateState = (e) => {
        setCeomessageData(existingValue => ({
            ...existingValue,
            // achievementType: e[0]["achievementType"],
            ceomessageTitle: e[0]["ceomessageTitle"],
            // employeeIdandName: e[0]["employeeIdandName"],
            // achievementArea: e[0]["achievementArea"],
            ceomessageDescription: e[0]["ceomessageDescription"],
            ceomessageEndDate: e[0]["ceomessageEndDate"],
            ceomessageImage: e[0]["ceomessageImage"],
            ceomessageStartDate: e[0]["ceomessageStartDate"]
        })
        )
        console.log(ceomessageData);
        console.log(parseISO("2023-04-06T18:30:00.000Z"));
    }
    const getCeomessageData = (id) => {
        let data = JSON.parse(localStorage.getItem("ceomessage"));
        if (data) {
            let adata = data.filter(ceomessages => ceomessages.id === id);
            updateState(adata);
            setNewCeomessage(data);
        } else {
            return [];
        }
    }
    useEffect(() => {

        try {
            getCeomessageData(idParamVal)
        }
        catch (error) {
            console.log(error);
        }
    }, [])
    const navigate = useHistory();
    const ValidationSchema = Yup.object().shape({
        // achievementType: Yup.string().required("Please select an option"),
        ceomessageTitle: Yup.string().required("Ceomessage Title is required"),
        // employeeIdandName: Yup.string().required("Please select an option"),
        // achievementArea: Yup.string().required("Please select an option"),
        ceomessageStartDate: Yup.string().required("Start Date is required"),
        ceomessageEndDate: Yup.string().required("End Date is required"),
        ceomessageDescription: Yup.string().required("Ceomessage Description is required"),
        ceomessageImage: Yup.string().required("Image is required"),
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
                    setFieldValue("ceomessageImage", reader.result);
                };
                reader.onerror = function (error) {
                    throw error;
                };
            } else {
                toast.error("only jpg,jpeg and png files are allowed");
            }
        } else {
            setFieldValue("ceomessageImage", "");
        }
    };
    //Handles The Event when data is changed
    const UpdateData = (id, updatedData) => {
        const datawithId = newceomessage.find(e => e.id == id); // finds the element with id 
        if (datawithId["id"] === updatedData.id) {
            let tempdata = newceomessage.indexOf(newceomessage.find(announcement => announcement.id == id));
            newceomessage[tempdata]= updatedData;
            setAllCeomessage([...newceomessage])
            
        }
        // setToDos([...toDos]) //updating the current state
        // localStorage.setItem("data", JSON.stringify(toDos)) //updating local storage with state
    }
    useEffect(() => {
        if (allceomessage.length > 0) {
            localStorage.setItem("ceomessage", JSON.stringify(allceomessage));
            navigate.push("/admindashboard/ceomessage");
        }
    }, [allceomessage])
    return (
        <div className="page-information-container">
            <header className="page-header">
                <label>Ceomessage</label>
            </header>
            <div className="createceomessage-container">
                <div className="createceomessage-header">
                    <Typography className="header-font" variant="body" gutterBottom>
                        Update Ceomessage
                    </Typography>
                </div>
                <div className="form-line">
                    <Divider sx={{ borderBottomWidth: 2 }} />
                </div>
                <Formik
                    initialValues={ceomessageData}
                    validationSchema={ValidationSchema}
                    enableReinitialize
                    onSubmit={data => {
                        let ceomessage = {
                            id: idParamVal,
                            // ceomessageType: data.ceomessageType,
                            ceomessageTitle: data.ceomessageTitle,
                            // employeeIdandName: data.employeeIdandName,
                            // achievementArea: data.achievementArea,
                            ceomessageStartDate: data.ceomessageStartDate,
                            ceomessageEndDate: data.ceomessageEndDate,
                            ceomessageDescription: data.ceomessageDescription,
                            ceomessageImage: data.ceomessageImage,
                            time: Math.floor(Date.now() / 1000),
                            isDeleted: false,
                        }
                        UpdateData(idParamVal, ceomessage);
                    }}
                >
                    {({ values, handleChange, handleBlur, errors, handleSubmit, touched, setFieldValue, setFieldError }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="createceomessageform">
                                <div className="formrow">
                                    {/* <div className="createceomessageforminput">
                                        <FormControl sx={{ width: 100 + "%" }}>
                                            <InputLabel id="demo-simple-select-autowidth-label">Achievement Type</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-autowidth-label"
                                                id="demo-simple-select-autowidth-label"
                                                name="achievementType"
                                                type="achievementType"
                                                label="Achievement Type"

                                                onChange={handleChange}
                                                value={values.achievementType}>
                                                <MenuItem value={"Achievement Type 1"}>Achievement Type 1</MenuItem>
                                                <MenuItem value={"Achievement Type 2"}>Achievement Type 2</MenuItem>
                                                <MenuItem value={"Achievement Type 3"}>Achievement Type 3</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <ValidationErrorMessage message={errors.achievementType} touched={touched.achievementType} />
                                    </div> */}
                                    <div className="createceomessageforminput">
                                        <TextField
                                            label="Ceomessage Title"
                                            name="ceomessageTitle"
                                            type="ceomessageTitle"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.ceomessageTitle}
                                            variant="outlined"
                                            sx={{ width: 100 + "%" }}
                                        />
                                        <ValidationErrorMessage message={errors.ceomessageTitle} touched={touched.ceomessageTitle} />

                                    </div>
                                </div>
                                {/* <div className="formrow">
                                    <div className="createachievementforminput">
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
                                                <MenuItem value={"Achievement Type 1"}>Achievement Type 1</MenuItem>
                                                <MenuItem value={"Achievement Type 2"}>Achievement Type 2</MenuItem>
                                                <MenuItem value={"Achievement Type 3"}>Achievement Type 3</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <ValidationErrorMessage message={errors.employeeIdandName} touched={touched.employeeIdandName} />

                                    </div>
                                </div> */}
                                <div className="formrow">
                                    {/* <div className="createachievementforminput">
                                        <FormControl sx={{ width: 100 + "%", marginTop: 1 + "vh" }}>
                                            <InputLabel id="demo-simple-select-autowidth-label">Achievement Area</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-autowidth-label"
                                                id="demo-simple-select-autowidth-label"
                                                name="achievementArea"
                                                type="achievementArea"
                                                label="achievementArea"
                                                onChange={handleChange}
                                                value={values.achievementArea}>
                                                <MenuItem value={"Achievement Type 1"}>Achievement Type 1</MenuItem>
                                                <MenuItem value={"Achievement Type 2"}>Achievement Type 2</MenuItem>
                                                <MenuItem value={"Achievement Type 3"}>Achievement Type 3</MenuItem>
                                            </Select>
                                        </FormControl>

                                        <ValidationErrorMessage message={errors.achievementArea} touched={touched.achievementArea} />
                                    </div>  */}
                                    <div className="createceomessageforminput">
                                        <DemoContainer required components={["DatePicker", "DatePicker"]}>
                                            <DatePicker
                                                label="Start Date"
                                                value={dayjs(values.ceomessageStartDate)}
                                                required
                                                format="DD-MM-YYYY"
                                                
                                                sx={{ width: 100 + "%" }}
                                                onChange={(newValue) => setFieldValue("ceomessageStartDate", newValue)}
                                                
                                            />
                                        </DemoContainer>
                                        <ValidationErrorMessage message={errors.ceomessageStartDate} touched={touched.ceomessageStartDate} />

                                    </div>
                                    <div className="createceomessageforminput">
                                        <DemoContainer required components={["DatePicker"]}>
                                            <DatePicker
                                                label="End Date"
                                                value={dayjs(values.ceomessageEndDate)}
                                                required
                                                format="DD-MM-YYYY"
                                                sx={{ width: 100 + "%" }}
                                                
                                                onChange={(newValue) => setFieldValue("ceomessageEndDate", newValue)}
                                        
                                            />
                                        </DemoContainer>
                                        <ValidationErrorMessage message={errors.ceomessageEndDate} touched={touched.ceomessageEndDate} />

                                    </div>
                                </div>
                                <div className="formrow">
                                    <div className="createceomessageforminput">
                                        <TextField
                                            id="outlined-multiline-static"
                                            label="Ceomessage Description"
                                            multiline
                                            rows={4}
                                            value={values.ceomessageDescription}
                                            name="ceomessageDescription"
                                            type="ceomessageDescription"
                                            variant="outlined"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            sx={{ width: 100 + "%" }}
                                        />
                                        <ValidationErrorMessage message={errors.ceomessageDescription} touched={touched.ceomessageDescription} />
                                    </div>
                                </div>
                                <div className="formrow">
                                    <div className="createceomessageforminput">
                                        <div className="form-col">
                                            {!values.ceomessageImage && (
                                                <>
                                                    {" "}
                                                    <label
                                                        htmlFor="contained-button-file"
                                                        className="file-upload-btn"
                                                    >
                                                        <Input
                                                            id="contained-button-file"
                                                            type="file"
                                                            name="ceomessageImage"
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
                                                        message={errors.ceomessageImage}
                                                        touched={touched.ceomessageImage}
                                                    />
                                                </>
                                            )}
                                            {values.ceomessageImage && (
                                                <div className="uploaded-file-name">
                                                    <em>
                                                        <img src={values.ceomessageImage} className="img-upload" width="10rem" height="10rem" alt="" />
                                                    </em>
                                                    <Button
                                                        style={{ marginLeft: 2 + "rem" }}
                                                        variant="contained"
                                                        component="span"
                                                        color="error"
                                                        onClick={() => {
                                                            setFieldValue("ceomessageImage", "");
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
                                    <div className="createceomessageforminput">
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
export default UpdateCeomessage