import * as React from "react";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./CreateCeomessage.css";
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
import { Ceomessage } from "../Ceomessage";
export const CreateCeomessage = () => {
    
    const navigate = useHistory();
    const [newceomessage,setNewCeomessage]=useState([]);
    const ValidationSchema = Yup.object().shape({
        // ceomessageType: Yup.string().required("Please select an option"),
        ceomessageTitle: Yup.string().required("Achievement Title is required"),
        // employeeIdandName: Yup.string().required("Please select an option"),
        // ceomessageArea: Yup.string().required("Please select an option"),
        ceomessageStartDate: Yup.string().required("Start Date is required"),
        ceomessageEndDate: Yup.string().required("End Date is required"),
        ceomessageDescription: Yup.string().required("Achievement Description is required"),
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
    useEffect(() => {
        let data = localStorage.getItem("ceomessage");
        if (data) {
          setNewCeomessage(JSON.parse(data));
        }
      }, []);
    return (
        <div className="page-information-container">
            <header className="page-header">
                <label>CMD Desk</label>
            </header>
            <div className="createceomessage-container">
                <div className="createceomessage-header">
                    <Typography className="header-font" variant="body" gutterBottom>
                        Create a new CMD Desk 
                    </Typography>
                </div>
                <div className="form-line">
                    <Divider sx={{ borderBottomWidth: 2 }} />
                </div>
                <Formik
                    initialValues={{
                        // ceomessageType: "",
                        ceomessageTitle: "",
                        // employeeIdandName: "",
                        // ceomessageArea: "",
                        ceomessageStartDate: null,
                        ceomessageEndDate: null,
                        ceomessageDescription: "",
                        ceomessageImage: ""
                    }}
                    validationSchema={ValidationSchema}
                    onSubmit={data => {
                        let ceomessage = {
                            id: Math.random(),
                            // ceomessageType: data.ceomessageType,
                            ceomessageTitle: data.ceomessageTitle,
                            // employeeIdandName: data.employeeIdandName,
                            // ceomessageArea: data.ceomessageArea,
                            ceomessageStartDate: data.ceomessageStartDate,
                            ceomessageEndDate: data.ceomessageEndDate,
                            ceomessageDescription: data.ceomessageDescription,
                            ceomessageImage: data.ceomessageImage,
                            time: Math.floor(Date.now() / 1000),
                            isDeleted: false,
                        }
                        newceomessage.push(ceomessage);
                        setNewCeomessage([...newceomessage]);
                        localStorage.setItem("ceomessage",JSON.stringify(newceomessage));
                        toast("Stored Successfully");
                        // console.log(JSON.stringify(achievement));
                        // submitData(achievement);
                        navigate.push("/admindashboard/ceomessage");
                    }}
                >
                    {({ values, handleChange, handleBlur, errors, handleSubmit, touched, setFieldValue, setFieldError }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="createceomessageform">
                                 <div className="formrow">
                                      {/* <div className="createceomessageforminput">
                                        <FormControl sx={{ width: 100 + "%" }}>
                                            <InputLabel id="demo-simple-select-autowidth-label">Ceomessage Type</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-autowidth-label"
                                                id="demo-simple-select-autowidth-label"
                                                name="ceomessageType"
                                                type="ceomessageType"
                                                label="Ceomessage Type"
                                                onChange={handleChange}
                                                value={values.ceomessageType}>
                                                <MenuItem value={"Ceomessage Type 1"}>Achievement Type 1</MenuItem>
                                                <MenuItem value={"Ceomessage Type 2"}>Achievement Type 2</MenuItem>
                                                <MenuItem value={"Ceomessage Type 3"}>Achievement Type 3</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <ValidationErrorMessage message={errors.ceomessageType} touched={touched.ceomessageType} /> 
                                    </div>     */}
                                    <div className="createceomessageforminput">
                                        <TextField
                                            label="Title"
                                            name="ceomessageTitle"
                                            type="ceomessageTitle"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            variant="outlined"
                                            sx={{ width: 100 + "%" }}
                                        />
                                        <ValidationErrorMessage message={errors.ceomessageTitle} touched={touched.ceomessageTitle} />

                                    </div>
                                </div>
                                {/* <div className="formrow">
                                    <div className="createceomessageforminput">
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
                                                <MenuItem value={"Ceomessage Type 1"}>Achievement Type 1</MenuItem>
                                                <MenuItem value={"Ceomessage Type 2"}>Achievement Type 2</MenuItem>
                                                <MenuItem value={"Ceomessage Type 3"}>Achievement Type 3</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <ValidationErrorMessage message={errors.employeeIdandName} touched={touched.employeeIdandName} />

                                    </div>
                                </div> */}
                                <div className="formrow">
                                    {/* <div className="createceomessageforminput">
                                        <FormControl sx={{ width: 100 + "%", marginTop: 1 + "vh" }}>
                                            <InputLabel id="demo-simple-select-autowidth-label">Ceomessage Area</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-autowidth-label"
                                                id="demo-simple-select-autowidth-label"
                                                name="ceomessageArea"
                                                type="ceomessageArea"
                                                label="ceomessageArea"
                                                onChange={handleChange}
                                                value={values.ceomessageArea}>
                                                <MenuItem value={"Ceomessage Type 1"}>Achievement Type 1</MenuItem>
                                                <MenuItem value={"Ceomessage Type 2"}>Achievement Type 2</MenuItem>
                                                <MenuItem value={"Ceomessage Type 3"}>Achievement Type 3</MenuItem>
                                            </Select>
                                        </FormControl>

                                        <ValidationErrorMessage message={errors.ceomessageArea} touched={touched.ceomessageArea} />
                                    </div> */}
                                    <div className="createceomessageforminput">
                                        <DemoContainer required components={["DatePicker", "DatePicker"]}>
                                            <DatePicker
                                                label="Start Date"
                                                value={values.ceomessageStartDate}
                                                required
                                                format="DD-MM-YYYY"
                                                sx={{ width: 100 + "%" }}
                                                onChange={(newValue) => setFieldValue("ceomessageStartDate", newValue)}
                                                disablePast
                                            />
                                        </DemoContainer>
                                        <ValidationErrorMessage message={errors.ceomessageStartDate} touched={touched.ceomessageStartDate} />

                                    </div>
                                    <div className="createceomessageforminput">
                                        <DemoContainer required components={["DatePicker"]}>
                                            <DatePicker
                                                label="End Date"
                                                value={values.ceomessageEndDate}
                                                required
                                                format="DD-MM-YYYY"
                                                sx={{ width: 100 + "%" }}
                                                onChange={(newValue) => setFieldValue("ceomessageEndDate", newValue)}
                                                disablePast
                                            />
                                        </DemoContainer>
                                        <ValidationErrorMessage message={errors.ceomessageEndDate} touched={touched.ceomessageEndDate} />

                                    </div>
                                </div>
                                <div className="formrow">
                                    <div className="createceomessageforminput">
                                        <TextField
                                            id="outlined-multiline-static"
                                            label="Description"
                                            multiline
                                            rows={4}
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
export default CreateCeomessage
