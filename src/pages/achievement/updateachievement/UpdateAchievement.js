import React from 'react'
import "./UpdateAchievement.css"
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
export const UpdateAchievement = () => {
    const [newachievement, setNewAchievement] = useState([]);
    const [allachievement, setAllAchievement] = useState([]);
    const { type } = useParams();
    const idParamVal = useLocation().state.idParam;
    const [achievementData, setAchievementData] = useState({
        achievementType: "",
        achievementTitle: "",
        employeeIdandName: "",
        achievementArea: "",
        achievementStartDate: "",
        achievementEndDate: "",
        achievementDescription: "",
        achievementImage: ""
    });
    const updateState = (e) => {
        setAchievementData(existingValue => ({
            ...existingValue,
            achievementType: e[0]["achievementType"],
            achievementTitle: e[0]["achievementTitle"],
            employeeIdandName: e[0]["employeeIdandName"],
            achievementArea: e[0]["achievementArea"],
            achievementDescription: e[0]["achievementDescription"],
            achievementEndDate: e[0]["achievementEndDate"],
            achievementImage: e[0]["achievementImage"],
            achievementStartDate: e[0]["achievementStartDate"]
        })
        )
    }
    const getAchievementData = (id) => {
        let data = JSON.parse(localStorage.getItem("achievement"));
        // setAllAchievement(data);
        if (data) {
            let adata = data.filter(achievements => achievements.id === id);
            updateState(adata);
            setNewAchievement(data);
        } else {
            return [];
        }
    }
    useEffect(() => {

        try {
            getAchievementData(idParamVal)
        }
        catch (error) {
            console.log(error);
        }
    }, [])
    const navigate = useHistory();
    const ValidationSchema = Yup.object().shape({
        achievementType: Yup.string().required("Please select an option"),
        achievementTitle: Yup.string().required("Achievement Title is required"),
        employeeIdandName: Yup.string().required("Please select an option"),
        achievementArea: Yup.string().required("Please select an option"),
        achievementStartDate: Yup.string().required("Start Date is required"),
        achievementEndDate: Yup.string().required("End Date is required"),
        achievementDescription: Yup.string().required("Achievement Description is required"),
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
        const datawithId = newachievement.find(e => e.id == id); // finds the element with id 
        if (datawithId["id"] === updatedData.id) {
            // let temp = JSON.parse(localStorage.getItem("achievement"));
            let tempdata = newachievement.indexOf(newachievement.find(achievements => achievements.id == id));
            newachievement[tempdata] = updatedData
            setAllAchievement([...newachievement])
            console.log(allachievement);
            localStorage.setItem("achievement", JSON.stringify(allachievement));
            navigate.push("/admindashboard/achievement");
        }
    }
    return (
        <div className="page-information-container">
            <header className="page-header">
                <label>Achievement</label>
            </header>
            <div className="createachievement-container">
                <div className="createachievement-header">
                    <Typography className="header-font" variant="body" gutterBottom>
                        Update achievement
                    </Typography>
                </div>
                <div className="form-line">
                    <Divider sx={{ borderBottomWidth: 2 }} />
                </div>
                <Formik
                    initialValues={achievementData}
                    validationSchema={ValidationSchema}
                    enableReinitialize
                    onSubmit={data => {
                        let achievement = {
                            id: idParamVal,
                            achievementType: data.achievementType,
                            achievementTitle: data.achievementTitle,
                            employeeIdandName: data.employeeIdandName,
                            achievementArea: data.achievementArea,
                            achievementStartDate: data.achievementStartDate,
                            achievementEndDate: data.achievementEndDate,
                            achievementDescription: data.achievementDescription,
                            achievementImage: data.achievementImage,
                            time: Math.floor(Date.now() / 1000),
                            isDeleted: false,
                        }
                        UpdateData(idParamVal, achievement);
                    }}
                >
                    {({ values, handleChange, handleBlur, errors, handleSubmit, touched, setFieldValue, setFieldError }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="createachievementform">
                                <div className="formrow">
                                    <div className="createachievementforminput">
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
                                    </div>
                                    <div className="createachievementforminput">
                                        <TextField
                                            label="Achievement Title"
                                            name="achievementTitle"
                                            type="achievementTitle"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.achievementTitle}
                                            variant="outlined"
                                            sx={{ width: 100 + "%" }}
                                        />
                                        <ValidationErrorMessage message={errors.achievementTitle} touched={touched.achievementTitle} />

                                    </div>
                                </div>
                                <div className="formrow">
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
                                </div>
                                <div className="formrow">
                                    <div className="createachievementforminput">
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
                                    </div>
                                    <div className="createachievementforminput">
                                        <DemoContainer required components={["DatePicker", "DatePicker"]}>
                                            <DatePicker
                                                label="Start Date"
                                                value={dayjs(values.achievementStartDate)}
                                                required
                                                format="DD-MM-YYYY"
                                                // defaultValue={dayjs(parseISO(values.achievementStartDate))}
                                                sx={{ width: 100 + "%" }}
                                                onChange={(newValue) => setFieldValue("achievementStartDate", newValue)}

                                            />
                                        </DemoContainer>
                                        <ValidationErrorMessage message={errors.achievementStartDate} touched={touched.achievementStartDate} />

                                    </div>
                                    <div className="createachievementforminput">
                                        <DemoContainer required components={["DatePicker"]}>
                                            <DatePicker
                                                label="End Date"
                                                value={dayjs(values.achievementEndDate)}
                                                required
                                                format="DD-MM-YYYY"
                                                sx={{ width: 100 + "%" }}
                                                // defaultValue={dayjs(values.achievementEndDate)}
                                                onChange={(newValue) => setFieldValue("achievementEndDate", newValue)}

                                            />
                                        </DemoContainer>
                                        <ValidationErrorMessage message={errors.achievementEndDate} touched={touched.achievementEndDate} />

                                    </div>
                                </div>
                                <div className="formrow">
                                    <div className="createachievementforminput">
                                        <TextField
                                            id="outlined-multiline-static"
                                            label="Achievement Description"
                                            multiline
                                            rows={4}
                                            value={values.achievementDescription}
                                            name="achievementDescription"
                                            type="achievementDescription"
                                            variant="outlined"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            sx={{ width: 100 + "%" }}
                                        />
                                        <ValidationErrorMessage message={errors.achievementDescription} touched={touched.achievementDescription} />
                                    </div>
                                </div>
                                <div className="formrow">
                                    <div className="createachievementforminput">
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
                                    <div className="createachievementforminput">
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
