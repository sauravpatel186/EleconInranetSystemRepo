import React from 'react'
import "./Updatethought.css"
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
export const Updatethought = () => {
    const [newthought, setNewThought] = useState([]);
    const { type } = useParams();
    const idParamVal = useLocation().state.idParam;
    const [thoughtData, setThoughtData] = useState({
        thoughtTitle: "",
        authorName: "",
        thoughtType: "",
        thoughtStartDate: "",
        thoughtEndDate: "",
        addThought: "",
        thoughtDescription: "",
        
    });
    const updateState = (e) => {
        setThoughtData(existingValue => ({
            ...existingValue,
            thoughtTitle: e[0]["thoughtTitle"],
            authorName: e[0][" authorName"],
            thoughtType: e[0]["thoughtType"],
            thoughtDescription: e[0]["thoughtDescription"],
            thoughtEndDate: e[0]["thoughtEndDate"],
            addThought: e[0]["addThought"],
            thoughtStartDate: e[0]["thoughtStartDate"],
        })
        )
        console.log(thoughtData);
        console.log(parseISO("2023-04-06T18:30:00.000Z"));
    }
    const getThoughtData = (id) => {
        let data = JSON.parse(localStorage.getItem("thought"));
        if (data) {
            let adata = data.filter(thoughts => thoughts.id === id);
            updateState(adata);
            setNewThought(data);
        } else {
            return [];
        }
    }
    useEffect(() => {

        try {
            getThoughtData(idParamVal)
        }
        catch (error) {
            console.log(error);
        }
    }, [])
    const navigate = useHistory();
    const ValidationSchema = Yup.object().shape({
        thoughtTitle: Yup.string().required("Thought Title is required"),
        authorName: Yup.string().required("Author Name is required"),
        thoughtType: Yup.string().required("Please select an option"),
        thoughtStartDate: Yup.string().required("Start Date is required"),
        thoughtEndDate: Yup.string().required("End Date is required"),
        addThought: Yup.string().required("Thought is required"),
        thoughtDescription: Yup.string().required("Thought Description is required"),
    })

    //Handles The Event when data is changed
    const UpdateData = (id, updatedData) => {
        const datawithId = newthought.find(e => e.id === id); // finds the element with id 
        if (datawithId["id"] === updatedData.id) {
            // /console.log(newthought);
            setNewThought(result => [...result,updatedData]);
            console.log(newthought);
        }
        // setToDos([...toDos]) //updating the current state
        // localStorage.setItem("data", JSON.stringify(toDos)) //updating local storage with state
    }
    return (
        <div className="page-information-container">
            <header className="page-header">
                <label>Thought of The day</label>
            </header>
            <div className="createthought-container">
                <div className="createthought-header">
                    <Typography className="header-font" variant="body" gutterBottom>
                        Update Thought
                    </Typography>
                </div>
                <div className="form-line">
                    <Divider sx={{ borderBottomWidth: 2 }} />
                </div>
                <Formik
                    initialValues={thoughtData}
                    validationSchema={ValidationSchema}
                    enableReinitialize
                    onSubmit={data => {
                        let thought = {
                            id: idParamVal,
                            thoughtTitle: data.thoughtTitle,
                            authorName: data.authorName,
                            thoughtType: data.thoughtType,
                            thoughtStartDate: JSON.stringify(data.thoughtStartDate),
                            thoughtEndDate: JSON.stringify(data.thoughtEndDate),
                            addThought: data.addThought,
                            thoughtDescription: data.thoughtDescription,
                            time: Math.floor(Date.now() / 1000),
                            isDeleted: false,
                        }
                        UpdateData(idParamVal, thought);
                    }}
                >
                    {({ values, handleChange, handleBlur, errors, handleSubmit, touched, setFieldValue, setFieldError }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="createthoughtform">
                                <div className="formrow">
                                    <div className="createachievementforminput">
                                        <TextField
                                            label="Thought Title"
                                            name="thoughtTitle"
                                            type="thoughtTitle"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.thoughtTitle}
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
                                            value={values.achievementTitle}
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
                                                value={dayjs(parseISO(values.thoughtStartDate))}
                                                required
                                                format="DD-MM-YYYY"
                                                defaultValue={dayjs(parseISO(values.thoughtStartDate))}
                                                sx={{ width: 100 + "%" }}
                                                onChange={(newValue) => setFieldValue("thoughtStartDate", newValue)}
                                                
                                            />
                                        </DemoContainer>
                                        <ValidationErrorMessage message={errors.thoughtStartDate} touched={touched.thoughtStartDate} />

                                    </div>
                                    <div className="createthoughtforminput">
                                        <DemoContainer required components={["DatePicker"]}>
                                            <DatePicker
                                                label="End Date"
                                                value={dayjs(parseISO(values.thoughtEndDate))}
                                                required
                                                format="DD-MM-YYYY"
                                                sx={{ width: 100 + "%" }}
                                                defaultValue={dayjs(values.thoughtEndDate)}
                                                onChange={(newValue) => setFieldValue("thoughtEndDate", newValue)}
                                        
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
                                            value={values.addThought}
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
                                            value={values.thoughtDescription}
                                            name="tohughtDescription"
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

export default Updatethought
