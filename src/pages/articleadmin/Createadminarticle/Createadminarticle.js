import * as React from "react";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./Createadminarticle.css";
import { ValidationErrorMessage } from "../../../components/ValidationErrorMessage/ValidationErrorMessage";
import { Breadcrumbs, Divider, Input } from "@mui/material";
import dayjs from "dayjs";
import * as Yup from "yup";
import { Formik } from "formik";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateField } from "@mui/x-date-pickers/DateField";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useRouteMatch, useHistory } from "react-router-dom";

const Createadminarticle = () => {
    const navigate = useHistory();
    const [newarticle, setnewarticle] = useState([]);
    const [userdata, setuserdata] = useState([]);
    const ValidationSchema = Yup.object().shape({
        articleTitle: Yup.string().required("Article Title is required"),
        articleLink: Yup.string().required("Link is required"),
        articleStartDate: Yup.string().required("Article start date is required"),
        articleEndDate: Yup.string().required("Article end date is required"),
        articleDescription: Yup.string().required(
            "Article description is required"
        ),
    });
    useEffect(() => {
        let data = localStorage.getItem("article");
        let udata = localStorage.getItem("user");
        if (data) {
            setnewarticle(JSON.parse(data));
        }
        if (udata) {
            setuserdata(JSON.parse(udata));
        }
        console.log(udata);
    }, []);
    return (
        <div className="page-information-container">
            <header className="page-header">
                <label>Article</label>
            </header>
            <div className="page-breadscrumb">
                <br />
                <Breadcrumbs aria-label="breadcrumb">
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/employeedashboard"
                        exact
                        to="/employeedashboard">
                        Home
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/employeedashboard/employeearticle"
                        exact
                        to="/employeedashboard/employeearticle">
                        Article
                    </Link>
                    <Link
                        underline="hover"
                        color="text.primary"
                        href="/employeedashboard/employeearticle/createemployeearticle"
                        aria-current="page">
                        Create Article
                    </Link>
                </Breadcrumbs>
            </div>
            <div className="createupcomingevent-container">
                <div className="createupcomingevent-header">
                    <Typography className="header-font" variant="body" gutterBottom>
                        Create an article
                    </Typography>
                </div>
                <div className="form-line">
                    <Divider sx={{ borderBottomWidth: 2 }} />
                </div>
                <Formik
                    initialValues={{
                        articleTitle: "",
                        articleStartDate: null,
                        articleEndDate: null,
                        articleLink: "",
                        articleDescription: "",
                    }}
                    validationSchema={ValidationSchema}
                    onSubmit={(data) => {
                        let article = {
                            id: Math.random(),
                            articleTitle: data.articleTitle,
                            articleStartDate: data.articleStartDate,
                            articleEndDate: data.articleEndDate,
                            articleLink: data.articleLink,
                            articleDescription: data.articleDescription,
                            time: Math.floor(Date.now() / 1000),
                            isApproved: true,
                            isDeleted: false,
                            empid: userdata[0].id,
                        };
                        newarticle.push(article);
                        setnewarticle([...newarticle]);
                        localStorage.setItem("article", JSON.stringify(newarticle));
                        toast("Stored Successfully");
                        navigate.push("/admindashboard/article");
                    }}>
                    {({
                        values,
                        handleChange,
                        handleBlur,
                        errors,
                        handleSubmit,
                        touched,
                        setFieldValue,
                        setFieldError,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="createeventform">
                                <div className="formrow">
                                    <div className="createeventforminput">
                                        <TextField
                                            label="Article Title"
                                            name="articleTitle"
                                            type="articleTitle"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            variant="outlined"
                                            sx={{ width: 100 + "%" }}
                                        />
                                        <ValidationErrorMessage
                                            message={errors.articleTitle}
                                            touched={touched.articleTitle}
                                        />
                                    </div>
                                    <div className="createeventforminput">
                                        <TextField
                                            label="Article Link"
                                            name="articleLink"
                                            type="articleLink"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            variant="outlined"
                                            sx={{ width: 100 + "%" }}
                                        />
                                        <ValidationErrorMessage
                                            message={errors.articleLink}
                                            touched={touched.articleLink}
                                        />
                                    </div>
                                </div>
                                <div className="formrow">
                                    <div className="createeventforminput">
                                        <DemoContainer
                                            required
                                            components={["DatePicker", "DatePicker"]}>
                                            <DatePicker
                                                label="Start Date"
                                                value={values.articleStartDate}
                                                required
                                                format="DD-MM-YYYY"
                                                sx={{ width: 100 + "%" }}
                                                onChange={(newValue) =>
                                                    setFieldValue("articleStartDate", newValue)
                                                }
                                                disablePast
                                            />
                                        </DemoContainer>
                                        <ValidationErrorMessage
                                            message={errors.articleStartDate}
                                            touched={touched.articleStartDate}
                                        />
                                    </div>
                                    <div className="createeventforminput">
                                        <DemoContainer required components={["DatePicker"]}>
                                            <DatePicker
                                                label="End Date"
                                                value={values.articleEndDate}
                                                required
                                                format="DD-MM-YYYY"
                                                sx={{ width: 100 + "%" }}
                                                onChange={(newValue) =>
                                                    setFieldValue("articleEndDate", newValue)
                                                }
                                                disablePast
                                            />
                                        </DemoContainer>
                                        <ValidationErrorMessage
                                            message={errors.articleEndDate}
                                            touched={touched.articleEndDate}
                                        />
                                    </div>
                                </div>
                                <div className="formrow">
                                    <div className="createeventforminput">
                                        <TextField
                                            id="outlined-multiline-static"
                                            label="Article Description"
                                            multiline
                                            rows={4}
                                            name="articleDescription"
                                            type="articleDescription"
                                            variant="outlined"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            sx={{ width: 100 + "%" }}
                                        />
                                        <ValidationErrorMessage
                                            message={errors.articleDescription}
                                            touched={touched.articleDescription}
                                        />
                                    </div>
                                </div>

                                <div className="formrow">
                                    <div className="createeventforminput">
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
    );
};

export default Createadminarticle;
