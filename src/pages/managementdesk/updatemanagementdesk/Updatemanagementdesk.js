import React from "react";
import "./Updatemanagementdesk.css";
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
export const Updatemanagementdesk = () => {
  const { type } = useParams();
  const [newmd, setNewMd] = useState([]);
  const idParamVal = useLocation().state.idParam;
  const [mdData, setmdData] = useState({
    mdTitle: "",
    mdStartDate: "",
    mdEndDate: "",
    mdDescription: "",
  });
  const updateState = (e) => {
    setmdData((existingValue) => ({
      ...existingValue,
      mdTitle: e[0]["mdTitle"],
      mdDescription: e[0]["mdDescription"],
      mdEndDate: e[0]["mdEndDate"],
      mdStartDate: e[0]["mdStartDate"],
    }));
    console.log(mdData);
    console.log(JSON.parse(localStorage.getItem("md")));
  };
  const getmdData = (id) => {
    let data = JSON.parse(localStorage.getItem("md"));
    if (data) {
      let edata = data.filter((events) => events.id === id);
      updateState(edata);
    } else {
        return [];
      }
    };
    useEffect(() => {
        try {
          getmdData(idParamVal);
        } catch (error) {
          console.log(error);
        }
      }, []);
    const navigate = useHistory();
    const ValidationSchema = Yup.object().shape({
      mdTitle: Yup.string().required("md Title is required."),
      mdStartDate: Yup.string().required("Start Date is required"),
      mdEndDate: Yup.string().required("End Date is required"),
      mdDescription: Yup.string().required("md Description is required"),
    });
    return (
        <div className="page-information-container">
          <header className="page-header">
            <label>Management Desk</label>
          </header>
          <div className="createevent-container">
            <div className="createevent-header">
              <Typography className="header-font" variant="body" gutterBottom>
                Update Management Desk
              </Typography>
            </div>
            <div className="form-line">
              <Divider sx={{ borderBottomWidth: 2 }} />
            </div>
            <Formik
              initialValues={mdData}
              validationSchema={ValidationSchema}
              enableReinitialize
              onSubmit={(data) => {
                let md = {
                  id: Math.random(),
                  mdTitle: data.mdTitle,
                  mdStartDate: data.mdStartDate,
                  mdEndDate: data.mdEndDate,
                  mdDescription: data.mdDescription,
                  time: Math.floor(Date.now() / 1000),
                  isDeleted: false,
                };
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
                          label="Event Title"
                          name="mdTitle"
                          type="mdTitle"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="outlined"
                          value={values.mdTitle}
                          sx={{ width: 100 + "%" }}
                        />
                        <ValidationErrorMessage
                          message={errors.mdTitle}
                          touched={touched.mdTitle}
                        />
                      </div>
                      <div className="createeventforminput">
                        <DemoContainer
                          required
                          components={["DatePicker", "DatePicker"]}>
                          <DatePicker
                            label="Start Date"
                            value={dayjs(parseISO(values.mdStartDate))}
                            format="DD-MM-YYYY"
                            sx={{ width: 100 + "%" }}
                            onChange={(newValue) =>
                              setFieldValue("mdStartDate", newValue)
                            }
                            // disablePast
                          />
                        </DemoContainer>
                        <ValidationErrorMessage
                          message={errors.mdStartDate}
                          touched={touched.mdStartDate}
                        />
                      </div>
                      <div className="createeventforminput">
                        <DemoContainer required components={["DatePicker"]}>
                          <DatePicker
                            label="End Date"
                            value={dayjs(parseISO(values.mdEndDate))}
                            format="DD-MM-YYYY"
                            sx={{ width: 100 + "%" }}
                            onChange={(newValue) =>
                              setFieldValue("mdEndDate", newValue)
                            }
                            //disablePast
                          />
                        </DemoContainer>
                        <ValidationErrorMessage
                          message={errors.mdEndDate}
                          touched={touched.mdEndDate}
                        />
                      </div>
                      
                    </div>
                    <div className="formrow">
                      <div className="createeventforminput">
                        <TextField
                          id="outlined-multiline-static"
                          label="Event Description"
                          multiline
                          value={values.mdDescription}
                          rows={4}
                          name="mdDescription"
                          type="mdDescription"
                          variant="outlined"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          sx={{ width: 100 + "%" }}
                        />
                        <ValidationErrorMessage
                          message={errors.mdDescription}
                          touched={touched.mdDescription}
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
}
export default Updatemanagementdesk 