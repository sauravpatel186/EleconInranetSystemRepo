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
        newsTitle: Yup.string().required("Notice Title is required"),
        newsStartDate: Yup.string().required("Start Date is required"),
        newsEndDate: Yup.string().required("End Date is required"),
        newsDescription: Yup.string().required("Notice Description is required"),
    })
    
    useEffect(() => {
        let data = localStorage.getItem("news");
        if (data) {
        setNewNotice(JSON.parse(data));
        }
      }, []);
    return (
        <div className="page-information-container">
            <header className="page-header">
                <label>News</label>
            </header>
            <div className="createnotice-container">
                <div className="createnotice-header">
                    <Typography className="header-font" variant="body" gutterBottom>
                        Create a new News
                    </Typography>
                </div>
                <div className="form-line">
                    <Divider sx={{ borderBottomWidth: 2 }} />
                </div>
                <Formik
                    initialValues={{
                        newsTitle:"",
                        newsDescription:"",
                        newsStartDate:null,
                        newsEndDate:null
                    }}
                    validationSchema={ValidationSchema}
                    onSubmit={data => {
                        let notice = {
                            id: Math.random(),
                            newsTitle: data.newsTitle,
                            newsStartDate: data.newsStartDate,
                            newsEndDate: data.newsEndDate,
                            newsDescription: data.newsDescription,
                            time: Math.floor(Date.now() / 1000),
                            isDeleted: false,
                        }
                        newnotice.push(notice);
                        setNewNotice([...newnotice]);
                        localStorage.setItem("news",JSON.stringify(newnotice));
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
                                            label="News Title"
                                            name="newsTitle"
                                            type="newsTitle"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            variant="outlined"
                                            sx={{ width: 100 + "%",marginTop:0.5+"rem" }}
                                        />
                                        <ValidationErrorMessage message={errors.newsTitle} touched={touched.newsTitle} />

                                    </div>
                                    <div className="createnoticeforminput">
                                        <DemoContainer required components={["DatePicker", "DatePicker"]}>
                                            <DatePicker
                                                label="View From"
                                                value={dayjs(values.newsStartDate)}
                                                
                                                format="DD-MM-YYYY"
                                                sx={{ width: 100 + "%" }}
                                                onChange={(newValue) => setFieldValue("newsStartDate", newValue)}
                                                disablePast
                                            />
                                        </DemoContainer>
                                        <ValidationErrorMessage message={errors.newsStartDate} touched={touched.noticeStartDate} />

                                    </div>
                                    <div className="createnoticeforminput">
                                        <DemoContainer required components={["DatePicker"]}>
                                            <DatePicker
                                                label="View Upto"
                                                value={dayjs(values.newsEndDate)}
                                                
                                                format="DD-MM-YYYY"
                                                sx={{ width: 100 + "%" }}
                                                onChange={(newValue) => setFieldValue("newsEndDate", newValue)}
                                                disablePast
                                            />
                                        </DemoContainer>
                                        <ValidationErrorMessage message={errors.newsEndDate} touched={touched.newsEndDate} />

                                    </div>
                                </div>
                                <div className="formrow">
                                    <div className="createnoticeforminput">
                                        <TextField
                                            id="outlined-multiline-static"
                                            label="News Description"
                                            multiline
                                            rows={4}
                                            name="newsDescription"
                                            type="newsDescription"
                                            variant="outlined"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            sx={{ width: 100 + "%" }}
                                        />
                                        <ValidationErrorMessage message={errors.newsDescription} touched={touched.newsDescription} />
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