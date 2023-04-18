import * as React from "react";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./Createnewjoinee.css";
import { ValidationErrorMessage } from "../../../../src/components/ValidationErrorMessage/ValidationErrorMessage"
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useRouteMatch, useHistory } from "react-router-dom";

const showToastMessage = () => {
    toast.success('Success Notification !', {
        position: toast.POSITION.TOP_RIGHT
    });
};

const Createnewjoinee = () => {
    require('yup-phone');
    const navigate = useHistory();
    const [newjoinee, setNewjoinee] = useState([]);
    const ValidationSchema = Yup.object().shape({
        njFirstName: Yup.string().required("First Name is required."),
        njDepartment: Yup.string().required("Department is required."),
        njMiddleName: Yup.string().required("Middle Name is required."),
        njGender: Yup.string().required("Gender is required."),
        njLastName: Yup.string().required("Last Name is required."),
        njDob: Yup.string().required("Date Of Birth is required"),
        njDoj: Yup.string().required("Date Of Join is required"),
        njCompany: Yup.string().required("Company is required"),
        njImage: Yup.string().required("Image is required"),
        njEmail: Yup.string().required("Email is required"),
        njPassword: Yup.string().required("Password is required"),
        njRole: Yup.string().required("Roles is required"),
        njDesignation : Yup.string().required("Designation is required"),
        njAddress: Yup.string().required("Address is required"),
        njMobileNo: Yup.string().required("Mobile No is required"),
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
                    setFieldValue("njImage", reader.result);
                };
                reader.onerror = function (error) {
                    throw error;
                };
            } else {
                toast.error("only jpg,jpeg and png files are allowed");
            }
        } else {
            setFieldValue("njImage", "");
        }
    };
    useEffect(() => {
        let data = localStorage.getItem("nj");
        if (data) {
            setNewjoinee(JSON.parse(data));
        }
    }, []);
    return (
        <div className="page-information-container">
            <header className="page-header">
                <label>New Joinee</label>
            </header>
            <div className='page-breadscrumb'>
                <br />
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/" exact to="/admindashboard">
                        Home
                    </Link>
                    <Link
                        underline="hover" color="inherit" href="/admindashboard/newjoinee" exact to="/admindashboard/newjoinee">
                        New Joinee
                    </Link>
                    <Link
                        underline="hover"
                        color="text.primary"
                        href="/admindashboard/newjoinee/createnewjoinee"
                        aria-current="page">
                        Add New Joinee
                    </Link>
                </Breadcrumbs>
            </div>
            <div className="createupcomingevent-container">
                <div className="createupcomingevent-header">
                    <Typography className="header-font" variant="body" gutterBottom>
                        Add New Joinee
                    </Typography>
                </div>
                <div className="form-line">
                    <Divider sx={{ borderBottomWidth: 2 }} />
                </div>
                <Formik
                    initialValues={{
                        njDepartment: "",
                        njFirstName: "",
                        njMiddleName: "",
                        njLastName: "",
                        njCompany: "",
                        njPassword: "",
                        njGender: "",
                        njDob: null,
                        njDoj: null,
                        njEmail: "",
                        njRole:"",
                        njDesignation:"",
                        njAddress: "",
                        njMobileNo: "",
                        njImage: "",
                    }}
                    validationSchema={ValidationSchema}
                    onSubmit={data => {
                        let nj = {
                            id: Math.random(),
                            njFirstName: data.njFirstName,
                            njMiddleName: data.njMiddleName,
                            njLastName: data.njLastName,
                            njDepartment: data.njDepartment,
                            njDob: data.njDob,
                            njDoj: data.njDoj,
                            njEmail: data.njEmail,
                            njCompany: data.njCompany,
                            njGender: data.njGender,
                            njPassword: data.njPassword,
                            njImage: data.njImage,
                            njRole: data.njRole,
                            njDesignation : data.njDesignation,
                            njAddress: data.njAddress,
                            njMobileNo: data.njMobileNo,
                            time: Math.floor(Date.now() / 1000),
                            isDeleted: false,
                        }
                        newjoinee.push(nj);
                        setNewjoinee([...newjoinee]);
                        console.log(newjoinee);
                        localStorage.setItem("nj", JSON.stringify(newjoinee));
                        toast("Stored Successfully");
                        navigate.push("/admindashbiard/newjoinee");
                    }}
                >
                    {({ values, handleChange, handleBlur, errors, handleSubmit, touched, setFieldValue, setFieldError }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="createeventform">
                                <div className="formrow">
                                    <div className="createeventforminput">
                                        <TextField
                                            label="First Name"
                                            name="njFirstName"
                                            type="njFirstName"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            variant="outlined"
                                            sx={{ width: 100 + "%" }}
                                        />
                                        <ValidationErrorMessage message={errors.njFirstName} touched={touched.njFirstName} />

                                    </div>
                                    <div className="createeventforminput">
                                        <TextField
                                            label="Middle Name"
                                            name="njMiddleName"
                                            type="njMiddleName"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            variant="outlined"
                                            sx={{ width: 100 + "%" }}
                                        />
                                        <ValidationErrorMessage message={errors.njMiddleName} touched={touched.njMiddleName} />
                                    </div>
                                    <div className="createeventforminput">
                                        <TextField
                                            label="Last Name"
                                            name="njLastName"
                                            type="njLastName"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            variant="outlined"
                                            sx={{ width: 100 + "%" }}
                                        />
                                        <ValidationErrorMessage message={errors.njLastName} touched={touched.njLastName} />
                                    </div>
                                </div>
                                <div className="formrow">
                                    <div className="createeventforminput">
                                        <DemoContainer required components={["DatePicker", "DatePicker"]}>
                                            <DatePicker
                                                label="Date Of Birth"
                                                value={values.njDob}
                                                required
                                                format="DD-MM-YYYY"
                                                sx={{ width: 100 + "%" }}
                                                onChange={(newValue) => setFieldValue("njDob", newValue)}
                                            //disablePast
                                            />
                                        </DemoContainer>
                                        <ValidationErrorMessage message={errors.njDob} touched={touched.njDob} />

                                    </div>
                                    <div className="createeventforminput">
                                        <DemoContainer required components={["DatePicker"]}>
                                            <DatePicker
                                                label="Date Of Join"
                                                value={values.njDoj}
                                                required
                                                format="DD-MM-YYYY"
                                                sx={{ width: 100 + "%" }}
                                                onChange={(newValue) => setFieldValue("njDoj", newValue)}
                                                disablePast
                                            />
                                        </DemoContainer>
                                        <ValidationErrorMessage message={errors.njDoj} touched={touched.njDoj} />

                                    </div>
                                    <div className="createeventforminput">
                                        <FormControl sx={{ width: 100 + "%", marginTop: "1vh" }}>
                                            <InputLabel id="demo-simple-select-autowidth-label">Gender</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-autowidth-label"
                                                id="demo-simple-select-autowidth-label"
                                                name="njGender"
                                                type="njGender"
                                                label="Gender"
                                                onChange={handleChange}
                                                value={values.njGender}>
                                                <MenuItem value={"Male"}>Male</MenuItem>
                                                <MenuItem value={"Female"}>Female</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <ValidationErrorMessage message={errors.njGender} touched={touched.njGender} />

                                    </div>

                                </div>
                                <div className="formrow">
                                    <div className="createeventforminput">
                                        <TextField
                                            label="Email ID"
                                            name="njEmail"
                                            type="njEmail"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            variant="outlined"
                                            sx={{ width: 100 + "%" }}
                                        />
                                        <ValidationErrorMessage message={errors.njEmail} touched={touched.njEmail} />

                                    </div>
                                    <div className="createeventforminput">
                                        <TextField
                                            label="Password"
                                            name="njPassword"
                                            type="njEmailid"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            variant="outlined"
                                            sx={{ width: 100 + "%" }}
                                        />
                                        <ValidationErrorMessage message={errors.njPassword} touched={touched.njPassword} />

                                    </div>
                                    <div className="createeventforminput">
                                        <FormControl sx={{ width: 100 + "%"}}>
                                            <InputLabel id="demo-simple-select-autowidth-label">Role</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-autowidth-label"
                                                id="demo-simple-select-autowidth-label"
                                                name="njRole"
                                                type="njRole"
                                                label="Rolw"
                                                onChange={handleChange}
                                                value={values.njRole}>
                                                <MenuItem value={"Normal"}>Normal</MenuItem>
                                                <MenuItem value={"Admin"}>Admin</MenuItem>
                                                
                                            </Select>
                                        </FormControl>
                                        <ValidationErrorMessage message={errors.njCompany} touched={touched.njCompany} />
                                    </div>
                                </div>
                                <div className="formrow">
                                    <div className="createeventforminput">
                                        <FormControl sx={{ width: 100 + "%", marginTop: "1vh" }}>
                                            <InputLabel id="demo-simple-select-autowidth-label">Department</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-autowidth-label"
                                                id="demo-simple-select-autowidth-label"
                                                name="njDepartment"
                                                type="njDepartment"
                                                label="Department"
                                                onChange={handleChange}
                                                value={values.njDepartment}>
                                                <MenuItem value={"Department 1"}>Department 1</MenuItem>
                                                <MenuItem value={"Department 2"}>Department 2</MenuItem>
                                                <MenuItem value={"Department 3"}>Department 3</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <ValidationErrorMessage message={errors.njDepartment} touched={touched.njDepartment} />
                                    </div>
                                    <div className="createeventforminput">
                                        <FormControl sx={{ width: 100 + "%", marginTop: "1vh" }}>
                                            <InputLabel id="demo-simple-select-autowidth-label">Company</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-autowidth-label"
                                                id="demo-simple-select-autowidth-label"
                                                name="njCompany"
                                                type="njCompany"
                                                label="Company"
                                                onChange={handleChange}
                                                value={values.njCompany}>
                                                <MenuItem value={"Company 1"}>Company 1</MenuItem>
                                                <MenuItem value={"Company 2"}>Company 2</MenuItem>
                                                <MenuItem value={"Company 3"}>Company 3</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <ValidationErrorMessage message={errors.njCompany} touched={touched.njCompany} />
                                    </div>
                                </div>
                                
                                <div className="formrow">
                                    
                                    <div className="createeventforminput">
                                    <TextField
                                            label="Designation"
                                            name="njDesignation"
                                            type="njDesignation"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            variant="outlined"
                                            sx={{ width: 100 + "%" }}
                                        />
                                        <ValidationErrorMessage message={errors.njDesignation} touched={touched.njDesignation} />

                                    </div>
                                    <div className="createeventforminput">
                                    <TextField
                                            label="Mobile No"
                                            name="njMobileNo"
                                            type="njMobileNo"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            variant="outlined"
                                            sx={{ width: 100 + "%" }}
                                        />
                                        <ValidationErrorMessage message={errors.njMobileNo} touched={touched.njMobileNo} />

                                    </div>
                                </div>
                                
                                <div className="formrow">
                                    <div className="createachievementforminput">
                                        <TextField
                                            id="outlined-multiline-static"
                                            label="Address"
                                            multiline
                                            rows={4}
                                            name="njAddress"
                                            type="njAddress"
                                            variant="outlined"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            sx={{ width: 100 + "%" }}
                                        />
                                        <ValidationErrorMessage message={errors.njAddress} touched={touched.njAddress} />
                                    </div>
                                </div>
                                <div className="formrow">
                                    <div className="createeventforminput">
                                        <div className="form-col">
                                            {!values.njImage && (
                                                <>
                                                    {" "}
                                                    <label
                                                        htmlFor="contained-button-file"
                                                        className="file-upload-btn"
                                                    >
                                                        <Input
                                                            id="contained-button-file"
                                                            type="file"
                                                            name="njImage"
                                                            variant="outlined"
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
                                                        message={errors.njImage}
                                                        touched={touched.njImage}
                                                    />
                                                </>
                                            )}
                                            {values.njImage && (
                                                <div className="uploaded-file-name">
                                                    <em>
                                                        <img src={values.njImage} className="img-upload" width="10rem" height="10rem" alt="" />
                                                    </em>
                                                    <Button
                                                        style={{ marginLeft: 2 + "rem" }}
                                                        variant="contained"
                                                        component="span"
                                                        color="error"
                                                        onClick={() => {
                                                            setFieldValue("njImage", "");
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
    )

}

export default Createnewjoinee;

