import * as React from "react";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./Createmanagementdesk.css";
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
import { Link, useRouteMatch,useHistory} from "react-router-dom";

const Createmanagementdesk = () => {
    const navigate = useHistory();
      const [newmd,setNewMd]=useState([]);
      const ValidationSchema = Yup.object().shape({
          mdTitle: Yup.string().required("md Title is required."),
          mdStartDate: Yup.string().required("Start Date is required"),
          mdEndDate: Yup.string().required("End Date is required"),
          mdDescription: Yup.string().required("md Description is required"),
          
      })
      useEffect(() => {
          let data = localStorage.getItem("md");
          if (data) {
            setNewMd(JSON.parse(data));
          }
        }, []);
      return (
          <div className="page-information-container">
              <header className="page-header">
                  <label>Management Desk</label>
              </header>
              <div className='page-breadscrumb'>
              <br/>
                <Breadcrumbs aria-label="breadcrumb">
                  <Link underline="hover" color="inherit" href="/" exact to="/">
                    Home
                  </Link>
                  <Link
                    underline="hover" color="inherit" href="/managementdesk" exact to="/managementdesk">
                    Management Desk
                  </Link>
                  <Link
                    underline="hover"
                    color="text.primary"
                    href="/managementdesk/createmanagementdeskt"
                    aria-current="page">
                    Create Management Desk
                  </Link>
                </Breadcrumbs>
              </div>
              <div className="createmd-container">
                  <div className="createmd-header">
                      <Typography className="header-font" variant="body" gutterBottom>
                          Create a Management Desk
                      </Typography>
                  </div>
                  <div className="form-line">
                      <Divider sx={{ borderBottomWidth: 2 }} />
                  </div>
                  <Formik
                      initialValues={{
                          
                          mdTitle: "",
                          mdStartDate: null,
                          mdEndDate: null,
                          mdDescription: "",
                      }}
                      validationSchema={ValidationSchema}
                      onSubmit={data => {
                          let md = {
                              id: Math.random(),
                              mdTitle: data.mdTitle,
                              mdStartDate: data.mdStartDate,
                              mdEndDate: data.mdEndDate,
                              mdDescription: data.mdDescription,
                              time: Math.floor(Date.now() / 1000),
                              isDeleted: false,
                          }
                          newmd.push(md);
                          setNewMd([...newmd]);
                          localStorage.setItem("md",JSON.stringify(newmd));
                          toast("Stored Successfully");
                          navigate.push("/managementdesk");
                      }}
                  >
                      {({ values, handleChange, handleBlur, errors, handleSubmit, touched, setFieldValue, setFieldError }) => (
                          <form onSubmit={handleSubmit}>
                              <div className="createeventform">
                                  <div className="formrow">
                                      <div className="createeventforminput">
                                          <TextField
                                              label="Event Title"
                                              name="mdTitle"
                                              type="mdTitle"
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              variant="outlined"
                                              sx={{ width: 100 + "%" }}
                                          />
                                          <ValidationErrorMessage message={errors.mdTitle} touched={touched.mdTitle} />
  
                                      </div>
                                      <div className="createeventforminput">
                                          <DemoContainer required components={["DatePicker", "DatePicker"]}>
                                              <DatePicker
                                                  label="Start Date"
                                                  value={dayjs(values.mdStartDate)}
                                                  required
                                                  format="DD-MM-YYYY"
                                                  sx={{ width: 100 + "%" }}
                                                  onChange={(newValue) => setFieldValue("mdStartDate", newValue)}
                                                  disablePast
                                              />
                                          </DemoContainer>
                                          <ValidationErrorMessage message={errors.mdStartDate} touched={touched.mdStartDate} />
  
                                      </div>
                                      <div className="createeventforminput">
                                          <DemoContainer required components={["DatePicker"]}>
                                              <DatePicker
                                                  label="End Date"
                                                  value={dayjs(values.mdEndDate)}
                                                  required
                                                  format="DD-MM-YYYY"
                                                  sx={{ width: 100 + "%" }}
                                                  onChange={(newValue) => setFieldValue("mdEndDate", newValue)}
                                                  disablePast
                                              />
                                          </DemoContainer>
                                          <ValidationErrorMessage message={errors.mdEndDate} touched={touched.mdEndDate} />
  
                                      </div>
                                  </div>
                                  <div className="formrow">
                                      <div className="createeventforminput">
                                          <TextField
                                              id="outlined-multiline-static"
                                              label="Event Description"
                                              multiline
                                              rows={4}
                                              name="mdDescription"
                                              type="mdDescription"
                                              variant="outlined"
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              sx={{ width: 100 + "%" }}
                                          />
                                          <ValidationErrorMessage message={errors.mdDescription} touched={touched.mdDescription} />
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
  
  export default Createmanagementdesk;