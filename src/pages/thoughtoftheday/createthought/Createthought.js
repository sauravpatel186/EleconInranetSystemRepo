import * as React from "react";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./Createthought.css";
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

export const Createthought = () => {
    
    const navigate = useHistory();
    const [newthought,setNewThought]=useState([]);
    const ValidationSchema = Yup.object().shape({
        Thoughttitle: Yup.string().required("Title is required"),
    })

    useEffect(() => {
        let data = localStorage.getItem("thought");
        if (data) {
          setNewThought(JSON.parse(data));
        }
      }, []);
    return (
        <div className="page-information-container">
            <header className="page-header">
                <label>Thought Of The Day</label>
            </header>
            <div className="createthought-container">
                <div className="createthought-header">
                    <Typography className="header-font" variant="body" gutterBottom>
                        Create a new thought
                    </Typography>
                </div>
                <div className="form-line">
                    <Divider sx={{ borderBottomWidth: 2 }} />
                </div>
                <Formik
                    initialValues={{
                        Thoughttitle: "",
                    }}
                    validationSchema={ValidationSchema}
                    onSubmit={data => {
                        let thought = {
                            id: Math.random(),
                            Thoughttitle: data.Thoughttitle,
                            isDeleted: false,
                        }
                        newthought.push(thought);
                        setNewThought([...newthought]);
                        localStorage.setItem("thought",JSON.stringify(newthought));
                        toast("Stored Successfully");
                        // console.log(JSON.stringify(thought));
                        // submitData(achievement);
                        navigate.push("/admindashboard/thoughtoftheday");
                    }}
                >
                    {({ values, handleChange, handleBlur, errors, handleSubmit, touched, setFieldValue, setFieldError }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="createthoughtform">
                                <div className="formrow">
                                    <div className="createthoughtforminput">
                                        <TextField
                                            label="Thought Title"
                                            name="Thoughttitle"
                                            type="Thoughttitle"
                                            multiline
                                            rows={7}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            variant="outlined"
                                            sx={{ width: 100 + "%" }}
                                        />
                                        <ValidationErrorMessage message={errors.Thoughttitle} touched={touched.Thoughttitle} />

                                    </div>
                                    </div>
                                    
                                <div className="formrow">
                                    <div className="createthoughtforminput">
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

export default Createthought