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
    const [allnotice, setallnotice] = useState([]);
    const idParamVal = useLocation().state.idParam;
    const [noticeData, setNoticeData] = useState({
        newsTitle: "",
        newsDescription: "",
        newsStartDate: "",
        newsEndDate: "",
    });
    const updateState = (e) => {
        setNoticeData(existingValue => ({
            ...existingValue,
            newsTitle: e[0]["newsTitle"],
            newsDescription: e[0]["newsDescription"],
            newsEndDate: e[0]["newsEndDate"],
            newsStartDate: e[0]["newsStartDate"],
            time: e[0]["time"],
            isDeleted: e[0]["isDeleted"],
        })
        )

    }
    const getNoticeData = (id) => {
        let data = JSON.parse(localStorage.getItem("news"));
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
        newsTitle: Yup.string().required("News Title is required"),
        newsStartDate: Yup.string().required("Start Date is required"),
        newsEndDate: Yup.string().required("End Date is required"),
        newsDescription: Yup.string().required("News Description is required"),

    })

    //Handles The Event when data is changed
    const UpdateData = (id, updatedData) => {
        const datawithId = newnotice.find(e => e.id == id); // finds the element with id 
        if (datawithId["id"] === updatedData.id) {
            console.log(datawithId);
            let tempdata = newnotice.indexOf(newnotice.find(announcement => announcement.id == id));
            newnotice[tempdata] = updatedData
            setallnotice([...newnotice])
            console.log(allnotice)
        }
    }
    useEffect(() => {
        if (allnotice.length > 0) {
            localStorage.setItem("news", JSON.stringify(allnotice));
            navigate.push("/admindashboard/news");
        }
    }, [allnotice])
    return (
        <div className="page-information-container">
            <header className="page-header">
                <label>News</label>
            </header>
            <div className="createnotice-container">
                <div className="createnotice-header">
                    <Typography className="header-font" variant="body" gutterBottom>
                        Update News
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
                            newsTitle: data.newsTitle,
                            newsStartDate: data.newsStartDate,
                            newsEndDate: data.newsEndDate,
                            newsDescription: data.newsDescription,
                            time:data.time,
                            isDeleted: data.isDeleted,
                        }
                        console.log(notice);
                        UpdateData(idParamVal, notice);
                    }}
                >
                    {({ values, handleChange, handleBlur, errors, handleSubmit, touched, setFieldValue, setFieldError }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="createnoticeform">
                                <div className="formrow">
                                    <div className="createnoticeforminput" style={{ marginTop: 0.5 + "rem" }}>
                                        <TextField
                                            label="Notice Title"
                                            name="newsTitle"
                                            type="newsTitle"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.newsTitle}
                                            variant="outlined"
                                            sx={{ width: 100 + "%" }}
                                        />
                                        <ValidationErrorMessage message={errors.newsTitle} touched={touched.newsTitle} />

                                    </div>
                                    <div className="createnoticeforminput">
                                        <DemoContainer required components={["DatePicker", "DatePicker"]}>
                                            <DatePicker
                                                label="View From"
                                                value={dayjs(values.newsStartDate)}
                                                required
                                                format="DD-MM-YYYY"

                                                sx={{ width: 100 + "%" }}
                                                onChange={(newValue) => setFieldValue("newsStartDate", newValue)}

                                            />
                                        </DemoContainer>
                                        <ValidationErrorMessage message={errors.newsStartDate} touched={touched.newsStartDate} />

                                    </div>
                                    <div className="createnoticeforminput">
                                        <DemoContainer required components={["DatePicker"]}>
                                            <DatePicker
                                                label="View Upto"
                                                value={dayjs(values.newsEndDate)}
                                                required
                                                format="DD-MM-YYYY"
                                                sx={{ width: 100 + "%" }}

                                                onChange={(newValue) => setFieldValue("newsEndDate", newValue)}

                                            />
                                        </DemoContainer>
                                        <ValidationErrorMessage message={errors.newsEndDate} touched={touched.newsEndDate} />

                                    </div>
                                </div>
                                <div className="formrow">
                                    <div className="createnoticeforminput">
                                        <TextField
                                            id="outlined-multiline-static"
                                            label="Notice Description"
                                            multiline
                                            rows={4}
                                            value={values.newsDescription}
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

export default Updatenotice