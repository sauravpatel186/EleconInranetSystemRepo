import React from 'react'
import "./Updatenotice.css"
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
export const Updatenotice = () => {
    const [newnotice, setNewNotice] = useState([]);
    const { type } = useParams();
    const idParamVal = useLocation().state.idParam;
    const [noticeData, setNoticeData] = useState({
        noticeTitle: "",
        noticeStartDate: "",
        noticeEndDate: "",
        noticeDescription: "",
        noticeImage: ""
    });
    const updateState = (e) => {
        setNoticeData(existingValue => ({
            ...existingValue,
            noticeTitle: e[0]["noticeTitle"],
            noticeDescription: e[0]["noticeDescription"],
            noticeEndDate: e[0]["noticeEndDate"],
            noticeImage: e[0]["noticeImage"],
            noticeStartDate: e[0]["noticeStartDate"]
        })
        )
        console.log(noticeData);
        console.log(parseISO("2023-04-06T18:30:00.000Z"));
    }
    const getNoticeData = (id) => {
        let data = JSON.parse(localStorage.getItem("notice"));
        if (data) {
            let adata = data.filter(notices => notices.id === id);
            updateState(adata);
            setNewNotice(data);
        } else {
            return [];
        }
    }
    useEffect(() => {

        try {
            getNoticeData(idParamVal)
        }
        catch (error) {
            console.log(error);
        }
    }, [])
    const navigate = useHistory();
    const ValidationSchema = Yup.object().shape({
        noticeTitle: Yup.string().required("Notice Title is required"),
        noticeStartDate: Yup.string().required("Start Date is required"),
        noticeEndDate: Yup.string().required("End Date is required"),
        noticeDescription: Yup.string().required("Notice Description is required"),
        noticeImage: Yup.string().required("Image is required"),
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
                    setFieldValue("noticeImage", reader.result);
                };
                reader.onerror = function (error) {
                    throw error;
                };
            } else {
                toast.error("only jpg,jpeg and png files are allowed");
            }
        } else {
            setFieldValue("noticeImage", "");
        }
    };
    //Handles The Event when data is changed
    const UpdateData = (id, updatedData) => {
        const datawithId = newnotice.find(e => e.id === id); // finds the element with id 
        if (datawithId["id"] === updatedData.id) {
            // /console.log(newachievement);
            setNewNotice(result => [...result,updatedData]);
            console.log(newnotice);
        }
        // setToDos([...toDos]) //updating the current state
        // localStorage.setItem("data", JSON.stringify(toDos)) //updating local storage with state
    }
    return (
        <div className="page-information-container">
            <header className="page-header">
                <label>Notice Board</label>
            </header>
            <div className="createnotice-container">
                <div className="createnotice-header">
                    <Typography className="header-font" variant="body" gutterBottom>
                        Update Notice
                    </Typography>
                </div>
                <div className="form-line">
                    <Divider sx={{ borderBottomWidth: 2 }} />
                </div>
                <Formik
                    initialValues={noticeData}
                    validationSchema={ValidationSchema}
                    enableReinitialize
                    onSubmit={data => {
                        let notice = {
                            id: idParamVal,
                            noticeTitle: data.noticeTitle,
                            noticeStartDate: JSON.stringify(data.noticeStartDate),
                            noticeEndDate: JSON.stringify(data.noticeEndDate),
                            noticeDescription: data.noticeDescription,
                            noticeImage: data.noticeImage,
                            time: Math.floor(Date.now() / 1000),
                            isDeleted: false,
                        }
                        UpdateData(idParamVal, notice);
                    }}
                >
                    {({ values, handleChange, handleBlur, errors, handleSubmit, touched, setFieldValue, setFieldError }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="createnoticeform">
                                <div className="formrow">
                                <div className="createnoticeforminput">
                                        <TextField
                                            label="Notice Title"
                                            name="noticeTitle"
                                            type="noticeTitle"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.achievementTitle}
                                            variant="outlined"
                                            sx={{ width: 100 + "%" }}
                                        />
                                        <ValidationErrorMessage message={errors.noticeTitle} touched={touched.noticeTitle} />

                                    </div>
                                    <div className="createnoticeforminput">
                                        <DemoContainer required components={["DatePicker", "DatePicker"]}>
                                            <DatePicker
                                                label="View From"
                                                value={dayjs(parseISO(values.noticeStartDate))}
                                                required
                                                format="DD-MM-YYYY"
                                                defaultValue={dayjs(parseISO(values.noticeStartDate))}
                                                sx={{ width: 100 + "%" }}
                                                onChange={(newValue) => setFieldValue("noticeStartDate", newValue)}
                                                
                                            />
                                        </DemoContainer>
                                        <ValidationErrorMessage message={errors.noticeStartDate} touched={touched.noticeStartDate} />

                                    </div>
                                    <div className="createnoticeforminput">
                                        <DemoContainer required components={["DatePicker"]}>
                                            <DatePicker
                                                label="View Upto"
                                                value={dayjs(parseISO(values.noticeEndDate))}
                                                required
                                                format="DD-MM-YYYY"
                                                sx={{ width: 100 + "%" }}
                                                defaultValue={dayjs(values.noticeEndDate)}
                                                onChange={(newValue) => setFieldValue("noticeEndDate", newValue)}
                                        
                                            />
                                        </DemoContainer>
                                        <ValidationErrorMessage message={errors.noticeEndDate} touched={touched.noticeEndDate} />

                                    </div>
                                </div>
                                <div className="formrow">
                                    <div className="createnoticeforminput">
                                        <TextField
                                            id="outlined-multiline-static"
                                            label="Notice Description"
                                            multiline
                                            rows={4}
                                            value={values.noticeDescription}
                                            name="noticeDescription"
                                            type="noticeDescription"
                                            variant="outlined"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            sx={{ width: 100 + "%" }}
                                        />
                                        <ValidationErrorMessage message={errors.noticeDescription} touched={touched.noticeDescription} />
                                    </div>
                                </div>
                                <div className="formrow">
                                    <div className="createnoticeforminput">
                                        <div className="form-col">
                                            {!values.noticeImage && (
                                                <>
                                                    {" "}
                                                    <label
                                                        htmlFor="contained-button-file"
                                                        className="file-upload-btn"
                                                    >
                                                        <Input
                                                            id="contained-button-file"
                                                            type="file"
                                                            name="noticeImage"
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
                                                        message={errors.noticeImage}
                                                        touched={touched.noticeImage}
                                                    />
                                                </>
                                            )}
                                            {values.noticeImage && (
                                                <div className="uploaded-file-name">
                                                    <em>
                                                        <img src={values.noticeImage} className="img-upload" width="10rem" height="10rem" alt="" />
                                                    </em>
                                                    <Button
                                                        style={{ marginLeft: 2 + "rem" }}
                                                        variant="contained"
                                                        component="span"
                                                        color="error"
                                                        onClick={() => {
                                                            setFieldValue("noticeImage", "");
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
                                    <div className="createnoticeforminput">
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

export default Updatenotice