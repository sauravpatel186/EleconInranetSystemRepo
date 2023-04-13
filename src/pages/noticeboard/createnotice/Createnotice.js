import * as React from "react";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import "./Createnotice.css";
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
import { Noticeboard } from "../Noticeboard";
export const Createnotice = () => {
    
    const navigate = useHistory();
    const [newnotice,setNewNotice]=useState([]);
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
    useEffect(() => {
        let data = localStorage.getItem("notice");
        if (data) {
        setNewNotice(JSON.parse(data));
        }
      }, []);
    return (
        <div className="page-information-container">
            <header className="page-header">
                <label>Notice Board</label>
            </header>
            <div className="createnotice-container">
                <div className="createnotice-header">
                    <Typography className="header-font" variant="body" gutterBottom>
                        Create a new notice
                    </Typography>
                </div>
                <div className="form-line">
                    <Divider sx={{ borderBottomWidth: 2 }} />
                </div>
                <Formik
                    initialValues={{
                        noticeTitle: "",
                        noticeStartDate: null,
                        noticeEndDate: null,
                        noticeDescription: "",
                        noticeImage: ""
                    }}
                    validationSchema={ValidationSchema}
                    onSubmit={data => {
                        let notice = {
                            id: Math.random(),
                            noticeTitle: data.noticeTitle,
                            noticeStartDate: data.noticeStartDate,
                            noticeEndDate: data.noticeEndDate,
                            noticeDescription: data.noticeDescription,
                            noticeImage: data.noticeImage,
                            time: Math.floor(Date.now() / 1000),
                            isDeleted: false,
                        }
                        newnotice.push(notice);
                        setNewNotice([...newnotice]);
                        localStorage.setItem("notice",JSON.stringify(newnotice));
                        toast("Stored Successfully");
                        // console.log(JSON.stringify(achievement));
                        // submitData(achievement);
                        navigate.push("/noticeboard");
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
                                            variant="outlined"
                                            sx={{ width: 100 + "%" }}
                                        />
                                        <ValidationErrorMessage message={errors.noticeTitle} touched={touched.noticeTitle} />

                                    </div>
                                    <div className="createnoticeforminput">
                                        <DemoContainer required components={["DatePicker", "DatePicker"]}>
                                            <DatePicker
                                                label="View From"
                                                value={values.noticeStartDate}
                                                required
                                                format="DD-MM-YYYY"
                                                sx={{ width: 100 + "%" }}
                                                onChange={(newValue) => setFieldValue("noticeStartDate", newValue)}
                                                disablePast
                                            />
                                        </DemoContainer>
                                        <ValidationErrorMessage message={errors.noticeStartDate} touched={touched.noticeStartDate} />

                                    </div>
                                    <div className="createnoticeforminput">
                                        <DemoContainer required components={["DatePicker"]}>
                                            <DatePicker
                                                label="View Upto"
                                                value={values.noticeEndDate}
                                                required
                                                format="DD-MM-YYYY"
                                                sx={{ width: 100 + "%" }}
                                                onChange={(newValue) => setFieldValue("noticeEndDate", newValue)}
                                                disablePast
                                            />
                                        </DemoContainer>
                                        <ValidationErrorMessage message={errors.noticeEndDate} touched={touched.noticeEndDate} />

                                    </div>
                                </div>
                                <div className="formrow">
                                    <div className="createnoticeforminput">
                                        <TextField
                                            id="outlined-multiline-static"
                                            label="Noitce Description"
                                            multiline
                                            rows={4}
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
                                                        <img src={values.achievementImage} className="img-upload" width="10rem" height="10rem" alt="" />
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

export default Createnotice