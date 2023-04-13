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
        thoughtTitle: Yup.string().required("Title is required"),
        authorName: Yup.string().required("Author name is required"),
        thoughtType: Yup.string().required("Please select an option"),
        thoughtStartDate: Yup.string().required("Start Date is required"),
        thoughtEndDate: Yup.string().required("End Date is required"),
        addThought: Yup.string().required("Thought is required"),
        thoughtDescription: Yup.string().required("Thought Description is required"),
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
                        thoughtTitle: "",
                        authorName: "",
                        thoughtType: "",
                        thoughtStartDate: null,
                        thoughtEndDate: null,
                        addThought: "",
                        thoughtDescription: "",
                    }}
                    validationSchema={ValidationSchema}
                    onSubmit={data => {
                        let thought = {
                            id: Math.random(),
                            thoughtTitle: data.thoughtTitle,
                            authorName: data.authorName,
                            thoughtType: data.thoughtType,
                            thoughtStartDate: data.thoughtStartDate,
                            thoughtEndDate: data.thoughtEndDate,
                            addThought: data.addThought,
                            thoughtDescription: data.thoughtDescription,
                            time: Math.floor(Date.now() / 1000),
                            isDeleted: false,
                        }
                        newthought.push(thought);
                        setNewThought([...newthought]);
                        localStorage.setItem("thought",JSON.stringify(newthought));
                        toast("Stored Successfully");
                        // console.log(JSON.stringify(thought));
                        // submitData(achievement);
                        navigate.push("/thoughtoftheday");
                    }}
                >
                    {({ values, handleChange, handleBlur, errors, handleSubmit, touched, setFieldValue, setFieldError }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="createthoughtform">
                                <div className="formrow">
                                    <div className="createthoughtforminput">
                                        <TextField
                                            label="Thought Title"
                                            name="thoughtTitle"
                                            type="thoughtTitle"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            variant="outlined"
                                            sx={{ width: 100 + "%" }}
                                        />
                                        <ValidationErrorMessage message={errors.thoughtTitle} touched={touched.thoughtTitle} />

                                    </div>
                                    <div className="createthoughtforminput">
                                        <TextField
                                            label="Author Name"
                                            name="authorName"
                                            type="authorName"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            variant="outlined"
                                            sx={{ width: 100 + "%" }}
                                        />
                                        <ValidationErrorMessage message={errors.authorName} touched={touched.authorName} />

                                    </div>
                                </div>
                            
                                <div className="formrow">
                                    <div className="createthoughtforminput">
                                        <FormControl sx={{ width: 100 + "%", marginTop: 1 + "vh" }}>
                                            <InputLabel id="demo-simple-select-autowidth-label">Thought Type</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-autowidth-label"
                                                id="demo-simple-select-autowidth-label"
                                                name="thoughtType"
                                                type="thoughtType"
                                                label="Thought Type"
                                                onChange={handleChange}
                                                value={values.thoughtType}>
                                                <MenuItem value={"Success"}>Success</MenuItem>
                                                <MenuItem value={"Motivation"}>Motivation</MenuItem>
                                                <MenuItem value={"Daily"}>Daily</MenuItem>
                                            </Select>
                                        </FormControl>

                                        <ValidationErrorMessage message={errors.thoughtType} touched={touched.thoughtType} />
                                    </div>
                                    <div className="createthoughtforminput">
                                        <DemoContainer required components={["DatePicker", "DatePicker"]}>
                                            <DatePicker
                                                label="Start Date"
                                                value={values.thoughtStartDate}
                                                required
                                                format="DD-MM-YYYY"
                                                sx={{ width: 100 + "%" }}
                                                onChange={(newValue) => setFieldValue("thoughtStartDate", newValue)}
                                                disablePast
                                            />
                                        </DemoContainer>
                                        <ValidationErrorMessage message={errors.thoughtStartDate} touched={touched.thoughtStartDate} />

                                    </div>
                                    <div className="createthoughtforminput">
                                        <DemoContainer required components={["DatePicker"]}>
                                            <DatePicker
                                                label="End Date"
                                                value={values.thoughtEndDate}
                                                required
                                                format="DD-MM-YYYY"
                                                sx={{ width: 100 + "%" }}
                                                onChange={(newValue) => setFieldValue("thoughtEndDate", newValue)}
                                                disablePast
                                            />
                                        </DemoContainer>
                                        <ValidationErrorMessage message={errors.thoughtEndDate} touched={touched.thoughtEndDate} />

                                    </div>
                                </div>

                                <div className="formrow">
                                    <div className="createthoughtforminput">
                                        <TextField
                                            label="Add Thought"
                                            name="addThought"
                                            type="addThought"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            variant="outlined"
                                            sx={{ width: 100 + "%" }}
                                        />
                                        <ValidationErrorMessage message={errors.addThought} touched={touched.addThought} />

                                    </div>
                                </div>
                                <div className="formrow">
                                    <div className="createthoughtforminput">
                                        <TextField
                                            id="outlined-multiline-static"
                                            label="Thought Description"
                                            multiline
                                            rows={4}
                                            name="thoughtDescription"
                                            type="thoughtDescription"
                                            variant="outlined"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            sx={{ width: 100 + "%" }}
                                        />
                                        <ValidationErrorMessage message={errors.thoughtDescription} touched={touched.thoughtDescription} />
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