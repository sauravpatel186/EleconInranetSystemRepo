import * as React from "react";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./CreateAchievement.css";
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
import { Achievement } from "../Achievement";
export const CreateAchievement = () => {
    
    const navigate = useHistory();
    const [newachievement,setNewAchievement]=useState([]);
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
    useEffect(() => {
        let data = localStorage.getItem("achievement");
        if (data) {
          setNewAchievement(JSON.parse(data));
        }
      }, []);
    return (
        <div className="page-information-container">
            <header className="page-header">
                <label>Achievement</label>
            </header>
            <div className="createachievement-container">
                <div className="createachievement-header">
                    <Typography className="header-font" variant="body" gutterBottom>
                        Create a new achievement
                    </Typography>
                </div>
                <div className="form-line">
                    <Divider sx={{ borderBottomWidth: 2 }} />
                </div>
                <Formik
                    initialValues={{
                        achievementType: "",
                        achievementTitle: "",
                        employeeIdandName: "",
                        achievementArea: "",
                        achievementStartDate: null,
                        achievementEndDate: null,
                        achievementDescription: "",
                        achievementImage: ""
                    }}
                    validationSchema={ValidationSchema}
                    onSubmit={data => {
                        let achievement = {
                            id: Math.random(),
                            achievementType: data.achievementType,
                            achievementTitle: data.achievementTitle,
                            employeeIdandName: data.employeeIdandName,
                            achievementArea: data.achievementArea,
                            achievementStartDate: JSON.stringify(dayjs(data.achievementStartDate)),
                            achievementEndDate: JSON.stringify(dayjs(data.achievementEndDate)),
                            achievementDescription: data.achievementDescription,
                            achievementImage: data.achievementImage,
                            time: Math.floor(Date.now() / 1000),
                            isDeleted: false,
                        }
                        newachievement.push(achievement);
                        setNewAchievement([...newachievement]);
                        localStorage.setItem("achievement",JSON.stringify(newachievement));
                        toast("Stored Successfully");
                        // console.log(JSON.stringify(achievement));
                        // submitData(achievement);
                        navigate.push("/achievement");
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
                                                value={values.achievementStartDate}
                                                required
                                                format="DD-MM-YYYY"
                                                sx={{ width: 100 + "%" }}
                                                onChange={(newValue) => setFieldValue("achievementStartDate", newValue)}
                                                disablePast
                                            />
                                        </DemoContainer>
                                        <ValidationErrorMessage message={errors.achievementStartDate} touched={touched.achievementStartDate} />

                                    </div>
                                    <div className="createachievementforminput">
                                        <DemoContainer required components={["DatePicker"]}>
                                            <DatePicker
                                                label="End Date"
                                                value={values.achievementEndDate}
                                                required
                                                format="DD-MM-YYYY"
                                                sx={{ width: 100 + "%" }}
                                                onChange={(newValue) => setFieldValue("achievementEndDate", newValue)}
                                                disablePast
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
