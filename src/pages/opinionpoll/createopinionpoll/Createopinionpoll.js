import "react-toastify/dist/ReactToastify.css";
import * as React from "react";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "../createopinionpoll/createopinionpoll.css";
import { ValidationErrorMessage } from "../../../../src/components/ValidationErrorMessage/ValidationErrorMessage";
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

const Createopinionpoll = () => {
  const navigate = useHistory();
  const [NewOpinionpoll, setNewOpinionpoll] = useState([]);
  const ValidationSchema = Yup.object().shape({
    opinionTitle: Yup.string().required("Opinion Poll Title is required."),
    opinionStartDate: Yup.string().required("Start Date is required"),
    opinionEndDate: Yup.string().required("End Date is required"),
    opinionDescription: Yup.string().required(
      "Opinion Poll Description is required"
    ),
    opinionType: Yup.string().required("Opinion Type is required"),
  });
  useEffect(() => {
    let data = localStorage.getItem("opinionpoll");
    if (data) {
      setNewOpinionpoll(JSON.parse(data));
    }
  }, []);
  return (
    <div className="page-information-container">
      <header className="page-header">
        <label>Opinion Poll</label>
      </header>
      <div className="page-breadscrumb">
        <br />
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/admindashboard" exact to="/admindashboard">
            Home
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/admindashboard/opinionpoll"
            exact
            to="/admindashboard/opinionpoll">
            Opinion Poll
          </Link>
          <Link
            underline="hover"
            color="text.primary"
            href="/admindashboard/opinionpoll/createopinionpoll"
            aria-current="page">
            Create Opinion Poll
          </Link>
        </Breadcrumbs>
      </div>
      <div className="createupcomingevent-container">
        <div className="createupcomingevent-header">
          <Typography className="header-font" variant="body" gutterBottom>
            Create a Opinion Poll
          </Typography>
        </div>
        <div className="form-line">
          <Divider sx={{ borderBottomWidth: 2 }} />
        </div>
        <Formik
          initialValues={{
            opinionTitle: "",
            opinionType: "",
            opinionStartDate: null,
            opinionEndDate: null,
            opinionDescription: "",
          }}
          validationSchema={ValidationSchema}
          onSubmit={(data) => {
            let opinionpoll = {
              id: Math.random(),
              opinionType: data.opinionType,
              opinionTitle: data.opinionTitle,
              opinionStartDate: data.opinionStartDate,
              opinionEndDate: data.opinionEndDate,
              opinionDescription: data.opinionDescription,
              time: Math.floor(Date.now() / 1000),
              isDeleted: false,
            };
            NewOpinionpoll.push(opinionpoll);
            setNewOpinionpoll([...NewOpinionpoll]);
            localStorage.setItem("opinionpoll", JSON.stringify(NewOpinionpoll));
            toast("Stored Successfully");
            navigate.push("/admindashboard/opinionpoll");
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
                      label="Opinion Poll Title"
                      name="opinionTitle"
                      type="opinionTitle"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      sx={{ width: 100 + "%" }}
                    />
                    <ValidationErrorMessage
                      message={errors.opinionTitle}
                      touched={touched.opinionTitle}
                    />
                  </div>
                </div>
                <div className="formrow">
                  <div className="createeventforminput">
                    <FormControl sx={{ width: 100 + "%" }}>
                      <InputLabel id="demo-simple-select-autowidth-label">
                        Opinion Poll Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth-label"
                        name="opinionType"
                        type="opinionType"
                        label="Opinion Poll Type"
                        onChange={handleChange}
                        value={values.opinionType}>
                        <MenuItem value={"YES/NO"}>YES/NO</MenuItem>
                        <MenuItem value={"AGREE/DISAGREE"}>
                          AGREE/DISAGREE
                        </MenuItem>
                        <MenuItem value={"TRUE/FALSE"}>TRUE/FALSE</MenuItem>
                      </Select>
                    </FormControl>
                    <ValidationErrorMessage
                      message={errors.opinionType}
                      touched={touched.opinionType}
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
                        value={(values.opinionStartDate)}
                        required
                        format="DD-MM-YYYY"
                        sx={{ width: 100 + "%" }}
                        onChange={(newValue) =>
                          setFieldValue("opinionStartDate", newValue)
                        }
                        disablePast
                      />
                    </DemoContainer>
                    <ValidationErrorMessage
                      message={errors.opinionStartDate}
                      touched={touched.opinionStartDate}
                    />
                  </div>
                  <div className="createeventforminput">
                    <DemoContainer required components={["DatePicker"]}>
                      <DatePicker
                        label="End Date"
                        value={values.opinionEndDate}
                        required
                        format="DD-MM-YYYY"
                        sx={{ width: 100 + "%" }}
                        onChange={(newValue) =>
                          setFieldValue("opinionEndDate", newValue)
                        }
                        disablePast
                      />
                    </DemoContainer>
                    <ValidationErrorMessage
                      message={errors.opinionEndDate}
                      touched={touched.opinionEndDate}
                    />
                  </div>
                </div>
                <div className="formrow">
                  <div className="createeventforminput">
                    <TextField
                      id="outlined-multiline-static"
                      label="Opinion Description"
                      multiline
                      rows={4}
                      name="opinionDescription"
                      type="opinionDescription"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{ width: 100 + "%" }}
                    />
                    <ValidationErrorMessage
                      message={errors.opinionDescription}
                      touched={touched.opinionDescription}
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

export default Createopinionpoll;
