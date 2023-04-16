import * as React from "react";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./CreateAnnouncement.css";
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

const CreateAnnouncement = () => {
    const navigate = useHistory();
      const [newannouncement,setNewAnnouncement]=useState([]);
      const ValidationSchema = Yup.object().shape({
          announcementTitle: Yup.string().required("Announcement Title is required."),
          announcementDepartment: Yup.string().required("Announcement department is required."),
          announcementStartDate: Yup.string().required("Start Date is required"),
          announcementEndDate: Yup.string().required("End Date is required"),
          announcementDescription: Yup.string().required("Announcement Description is required"),
      })
      useEffect(() => {
          let data = localStorage.getItem("announcement");
          if (data) {
            setNewAnnouncement(JSON.parse(data));
          }
        }, []);
      return (
          <div className="page-information-container">
              <header className="page-header">
                  <label>Announcement</label>
              </header>
              <div className='page-breadscrumb'>
              <br/>
                <Breadcrumbs aria-label="breadcrumb">
                  <Link underline="hover" color="inherit" href="/admindashboard" exact to="/admindashboard">
                    Home
                  </Link>
                  <Link
                    underline="hover" color="inherit" href="/admindashboard/announcement" exact to="/admindashboard/announcement">
                    Announcement
                  </Link>
                  <Link
                    underline="hover"
                    color="text.primary"
                    href="/admindashboard/announcement/createannouncement"
                    aria-current="page">
                    Create Announcement
                  </Link>
                </Breadcrumbs>
              </div>
              <div className="createupcomingevent-container">
                  <div className="createupcomingevent-header">
                      <Typography className="header-font" variant="body" gutterBottom>
                          Create a new announcement
                      </Typography>
                  </div>
                  <div className="form-line">
                      <Divider sx={{ borderBottomWidth: 2 }} />
                  </div>
                  <Formik
                      initialValues={{
                          announcementDepartment: "",
                          announcementTitle: "",
                          announcementStartDate: null,
                          announcementEndDate: null,
                          announcementDescription: "",
                      }}
                      validationSchema={ValidationSchema}
                      onSubmit={data => {
                          let announcement = {
                              id: Math.random(),
                              
                              announcementTitle: data.announcementTitle,
                              announcementDepartment: data.announcementDepartment,
                              announcementStartDate: data.announcementStartDate,
                              announcementEndDate: data.announcementEndDate,
                              announcementDescription: data.announcementDescription,
                              time: Math.floor(Date.now() / 1000),
                              isDeleted: false,
                          }
                          newannouncement.push(announcement);
                          setNewAnnouncement([...newannouncement]);
                          localStorage.setItem("announcement",JSON.stringify(newannouncement));
                          toast("Stored Successfully");
                          navigate.push("/admindashboard/announcement");
                      }}
                  >
                      {({ values, handleChange, handleBlur, errors, handleSubmit, touched, setFieldValue, setFieldError }) => (
                          <form onSubmit={handleSubmit}>
                              <div className="createeventform">
                                  <div className="formrow">
                                      <div className="createeventforminput">
                                          <TextField
                                              label="Announcement Title"
                                              name="announcementTitle"
                                              type="announcementTitle"
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              variant="outlined"
                                              sx={{ width: 100 + "%" }}
                                          />
                                          <ValidationErrorMessage message={errors.announcementTitle} touched={touched.announcementTitle} />
  
                                      </div>
                                      <div className="createeventforminput">
                                          <FormControl sx={{ width: 100 + "%" }}>
                                              <InputLabel id="demo-simple-select-autowidth-label">Department</InputLabel>
                                              <Select
                                                  labelId="demo-simple-select-autowidth-label"
                                                  id="demo-simple-select-autowidth-label"
                                                  name="announcementDepartment"
                                                  type="announcementDepartment"
                                                  label="Department"
                                                  onChange={handleChange}
                                                  value={values.announcementDepartment}>
                                                  <MenuItem value={"Department 1"}>Department 1</MenuItem>
                                                  <MenuItem value={"Department 2"}>Department 2</MenuItem>
                                                  <MenuItem value={"Department 3"}>Department 3</MenuItem>
                                              </Select>
                                          </FormControl>
                                          <ValidationErrorMessage message={errors.announcementDepartment} touched={touched.announcementDepartment} />
                                      </div>
                                  </div>
                                  <div className="formrow">
                                      <div className="createeventforminput">
                                          <DemoContainer required components={["DatePicker", "DatePicker"]}>
                                              <DatePicker
                                                  label="Start Date"
                                                  value={(values.announcementStartDate)}
                                                  required
                                                  format="DD-MM-YYYY"
                                                  sx={{ width: 100 + "%" }}
                                                  onChange={(newValue) => setFieldValue("announcementStartDate", newValue)}
                                                  disablePast
                                              />
                                          </DemoContainer>
                                          <ValidationErrorMessage message={errors.announcementStartDate} touched={touched.announcementStartDate} />
  
                                      </div>
                                      <div className="createeventforminput">
                                          <DemoContainer required components={["DatePicker"]}>
                                              <DatePicker
                                                  label="End Date"
                                                  value={(values.announcementEndDate)}
                                                  required
                                                  format="DD-MM-YYYY"
                                                  sx={{ width: 100 + "%" }}
                                                  onChange={(newValue) => setFieldValue("announcementEndDate", newValue)}
                                                  disablePast
                                              />
                                          </DemoContainer>
                                          <ValidationErrorMessage message={errors.announcementEndDate} touched={touched.announcementEndDate} />
  
                                      </div>
                                  </div>
                                  <div className="formrow">
                                      <div className="createeventforminput">
                                          <TextField
                                              id="outlined-multiline-static"
                                              label="Announcement Description"
                                              multiline
                                              rows={4}
                                              name="announcementDescription"
                                              type="announcementDescription"
                                              variant="outlined"
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              sx={{ width: 100 + "%" }}
                                          />
                                          <ValidationErrorMessage message={errors.announcementDescription} touched={touched.announcementDescription} />
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
  
  export default CreateAnnouncement;
  