import * as React from "react";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./Createarticle.css";
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

const UpdateEmployeeArticle = () => {
    const [newarticle, setnewarticle] = useState([]);
    const [AllArticle, setAllArticle] = useState([]);
    const { type } = useParams();
    const idParamVal = useLocation().state.idParam;
    const [userdata, setUerData] = useState([]);
    const [articleData, setarticleData] = useState({
        articleTitle: "",
        articleStartDate: "",
        articleEndDate: "",
        articleLink: "",
        articleDescription: "",
        empid: "",
    });
    const updateState = (e) => {
        setarticleData((existingValue) => ({
            ...existingValue,
            articleTitle: e[0]["articleTitle"],
            articleStartDate: e[0]["articleStartDate"],
            articleEndDate: e[0]["articleEndDate"],
            articleLink: e[0]["articleLink"],
            articleDescription: e[0]["articleDescription"],
            empid: e[0]["empid"],
            time: e[0]["time"],
            isApproved: e[0]["isApproved"],
            isDeleted: e[0]["isDeleted"],
        }));

        //console.log(announcementData);
        //console.log(JSON.parse(localStorage.getItem("announcement")));
    };
    const getarticleData = (id) => {
        let data = JSON.parse(localStorage.getItem("article"));
        if (data) {
            let edata = data.filter(announcements => announcements.id == id);
            updateState(edata);
            setnewarticle(data);
            console.log(edata);
        } else {
            return [];
        }
    };

    useEffect(() => {
        try {
            getarticleData(idParamVal);
        } catch (error) {
            console.log(error);
        }
    }, []);
    const navigate = useHistory();
    const ValidationSchema = Yup.object().shape({
        articleTitle: Yup.string().required("Article Title is required"),
        articleLink: Yup.string().required("Link is required"),
        articleStartDate: Yup.string().required("Article start date is required"),
        articleEndDate: Yup.string().required("Article end date is required"),
        articleDescription: Yup.string().required(
            "Article description is required"
        ),
    });
    //Handles The Event when data is changed
    const UpdateData = (id, updatedData) => {
        const datawithId = newarticle.find(e => e.id == id); // finds the element with id 
        if (datawithId["id"] == updatedData.id) {
            // let temp = JSON.parse(localStorage.getItem("achievement"));
            let tempdata = newarticle.indexOf(newarticle.find(announcement => announcement.id == id));
            newarticle[tempdata] = updatedData
            setAllArticle([...newarticle])
            console.log(AllArticle);
        }

    }
    useEffect(() => {
        if (AllArticle.length > 0) {
            localStorage.setItem("article", JSON.stringify(AllArticle));
            navigate.push("/employeedashboard/article");
        }
    }, [AllArticle])

    return (
        <div className="page-information-container">
            <header className="page-header">
                <label>Article</label>
            </header>
            <div className="createupcomingevent-container">
                <div className="createupcomingevent-header">
                    <Typography className="header-font" variant="body" gutterBottom>
                        Update Article
                    </Typography>
                </div>
                <div className="form-line">
                    <Divider sx={{ borderBottomWidth: 2 }} />
                </div>
                <Formik
                    initialValues={articleData}
                    validationSchema={ValidationSchema}
                    enableReinitialize
                    onSubmit={(data) => {
                        let article = {
                            id: idParamVal,
                            articleTitle: data.articleTitle,
                            articleStartDate: data.articleStartDate,
                            articleEndDate: data.articleEndDate,
                            articleLink: data.articleLink,
                            articleDescription: data.articleDescription,
                            empid: data.empid,
                            time:data.time,
                            isApproved:data.isApproved,
                            isDeleted: data.isDeleted,
                        };
                        UpdateData(idParamVal, article);
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
                                            value={values.articleTitle}
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
                                            value={values.articleLink}
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
                                                value={dayjs(values.articleStartDate)}
                                                required
                                                format="DD-MM-YYYY"
                                                sx={{ width: 100 + "%" }}
                                                onChange={(newValue) =>
                                                    setFieldValue("articleStartDate", newValue)
                                                }

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
                                                value={dayjs(values.articleEndDate)}
                                                required
                                                format="DD-MM-YYYY"
                                                sx={{ width: 100 + "%" }}
                                                onChange={(newValue) =>
                                                    setFieldValue("articleEndDate", newValue)
                                                }

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
                                            value={values.articleDescription}
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
                {/* {console.log(announcementData.announcementDepartment)} */}
            </div>
        </div>
    )
};

export default UpdateEmployeeArticle;
