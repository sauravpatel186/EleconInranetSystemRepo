import React from "react";
//import "./Updateupcomingevent.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { toast } from "react-toastify";
import { Divider, Input } from "@mui/material";
import { parseISO } from "date-fns";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as Yup from "yup";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import "react-toastify/dist/ReactToastify.css";
import { ValidationErrorMessage } from "../../../components/ValidationErrorMessage/ValidationErrorMessage";
import { Formik } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useHistory } from "react-router-dom";
export const updatenewjoinee = () => {
    const { type } = useParams();
    const idParamVal = useLocation().state.idParam;
    const [njData, setnjData] = useState({
        njDepartment: "",
        njFirstName: "",
        njMiddleName: "",
        njLastName: "",
        njCompany: "",
        njDob: "",
        njDoj: "",
        njImage: "",
        njGender: "",
        njEmailId: "",
        njPassword: "",
    });
    const updateState = (e) => {
        setnjData((existingValue) => ({
          ...existingValue,
        njDepartment: e[0]["njDepartment"],
        njFirstName: e[0]["njFirstName"] ,
        njMiddleName: e[0]["njMiddleName"],
        njLastName: e[0]["njLastName"],
        njCompany: e[0]["njCompany"],
        njDob: e[0]["njDOb"],
        njDoj: e[0]["njDojGender"],
        njEmailId: e[0]["njEmailId"],
        njPassword: e[0]["njPassword"],
    }));
    console.log(njData);
    console.log(JSON.parse(localStorage.getItem("nj")));
 };
 const geteventData = (id) => {
    let data = JSON.parse(localStorage.getItem("nj"));
    if (data) {
      let edata = data.filter((events) => events.id === id);
      updateState(edata);
    } else {
      return [];
    }
  };
  useEffect(() => {
    try {
      geteventData(idParamVal);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const navigate = useHistory();
  const [newnj, setnewNj] = useState([]);
  const ValidationSchema = Yup.object().shape({
    njFirstName: Yup.string().required("First Name is required."),
    njDepartment: Yup.string().required("Department is required."),
    njMiddleName: Yup.string().required("Middle Name is required."),
    njGender: Yup.string().required("Gender is required."),
    njLastName: Yup.string().required("Last Name is required."),
    njDob: Yup.string().required("Date Of Birth is required"),
    njDoi: Yup.string().required("Date Of Joim is required"),
    njCompany: Yup.string().required("Company is required"),
    njImage: Yup.string().required("Image is required"),
    njEmailId: Yup.string().required("Email is required"),
    njPassword: Yup.string().required("Password is required"),

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
return (
    <div className="page-information-container">
      <header className="page-header">
        <label>New Joinee</label>
      </header>
      <div className="createevent-container">
        <div className="createevent-header">
          <Typography className="header-font" variant="body" gutterBottom>
            Update New Joinee
          </Typography>
        </div>
        <div className="form-line">
          <Divider sx={{ borderBottomWidth: 2 }} />
        </div>
        <Formik
          initialValues={njData}
          validationSchema={ValidationSchema}
          enableReinitialize
          onSubmit={data => {
            let nj = {
                id: Math.random(),
                njFirstName: data. njFirstName,
                njMiddleName: data.njMiddleName,
                njLastName: data.njLastName,
                njDepartment: data.njDepartment,
                njDob: data.njDob,
                njDoj: data.njDoj,
                njCompany:data.njCompany,
                njGender: data.njGender,
                njImage: data.njImage,
                njEmailId: data.njEmailId,
                njPassword: data.njPassword,
                time: Math.floor(Date.now() / 1000),
                isDeleted: false,
            }
        }}>
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
                                                  value={dayjs(values.njDob)}
                                                  required
                                                  format="DD-MM-YYYY"
                                                  sx={{ width: 100 + "%" }}
                                                  onChange={(newValue) => setFieldValue("njDob", newValue)}
                                                  disablePast
                                              />
                                          </DemoContainer>
                                          <ValidationErrorMessage message={errors.njDob} touched={touched.njDob} />
  
                                      </div>
                                      <div className="createeventforminput">
                                          <DemoContainer required components={["DatePicker"]}>
                                              <DatePicker
                                                  label="Date Of Join"
                                                  value={dayjs(values.njDoj)}
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
                                          <FormControl sx={{ width: 100 + "%", marginTop: "1vh"}}>
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
                                          <FormControl sx={{ width: 100 + "%",marginTop: "1vh" }}>
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
                                          <FormControl sx={{ width: 100 + "%", marginTop: "1vh"}}>
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
                                              label="Email ID"
                                              name="njEmailId"
                                              type="njEmailid"
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              variant="outlined"
                                              sx={{ width: 100 + "%" }}
                                          />
                                          <ValidationErrorMessage message={errors.njEmailId} touched={touched.njEmailId} />

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
        );
}
export default Updatenewjoinee;