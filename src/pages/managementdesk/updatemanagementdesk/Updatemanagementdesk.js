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
  const idParamVal = useLocation().state.idParam;
  const [eventData, seteventData] = useState({
    eventTitle: "",
    eventStartDate: "",
    eventEndDate: "",
    eventDescription: "",
  });
  const updateState = (e) => {
    seteventData((existingValue) => ({
      ...existingValue,
      eventTitle: e[0]["eventTitle"],
      eventDescription: e[0]["eventDescription"],
      eventEndDate: e[0]["eventEndDate"],
      eventStartDate: e[0]["eventStartDate"],
    }));
    console.log(eventData);
    console.log(JSON.parse(localStorage.getItem("event")));
  };
  const geteventData = (id) => {
    let data = JSON.parse(localStorage.getItem("event"));
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
    const [newevent, setnewevent] = useState([]);
    const ValidationSchema = Yup.object().shape({
      eventTitle: Yup.string().required("Event Title is required."),
      eventStartDate: Yup.string().required("Start Date is required"),
      eventEndDate: Yup.string().required("End Date is required"),
      eventDescription: Yup.string().required("Event Description is required"),
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
              initialValues={eventData}
              validationSchema={ValidationSchema}
              enableReinitialize
              onSubmit={(data) => {
                let event = {
                  id: Math.random(),
                  eventTitle: data.eventTitle,
                  eventStartDate: data.eventStartDate,
                  eventEndDate: data.eventEndDate,
                  eventDescription: data.eventDescription,
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
                          name="eventTitle"
                          type="eventTitle"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="outlined"
                          value={values.eventTitle}
                          sx={{ width: 100 + "%" }}
                        />
                        <ValidationErrorMessage
                          message={errors.eventTitle}
                          touched={touched.eventTitle}
                        />
                      </div>
                      <div className="createeventforminput">
                        <DemoContainer
                          required
                          components={["DatePicker", "DatePicker"]}>
                          <DatePicker
                            label="Start Date"
                            value={dayjs(parseISO(values.eventStartDate))}
                            format="DD-MM-YYYY"
                            sx={{ width: 100 + "%" }}
                            onChange={(newValue) =>
                              setFieldValue("eventStartDate", newValue)
                            }
                            // disablePast
                          />
                        </DemoContainer>
                        <ValidationErrorMessage
                          message={errors.eventStartDate}
                          touched={touched.eventStartDate}
                        />
                      </div>
                      <div className="createeventforminput">
                        <DemoContainer required components={["DatePicker"]}>
                          <DatePicker
                            label="End Date"
                            value={dayjs(parseISO(values.eventEndDate))}
                            format="DD-MM-YYYY"
                            sx={{ width: 100 + "%" }}
                            onChange={(newValue) =>
                              setFieldValue("eventEndDate", newValue)
                            }
                            //disablePast
                          />
                        </DemoContainer>
                        <ValidationErrorMessage
                          message={errors.eventEndDate}
                          touched={touched.eventEndDate}
                        />
                      </div>
                      
                    </div>
                    <div className="formrow">
                      <div className="createeventforminput">
                        <TextField
                          id="outlined-multiline-static"
                          label="Event Description"
                          multiline
                          value={values.eventDescription}
                          rows={4}
                          name="eventDescription"
                          type="eventDescription"
                          variant="outlined"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          sx={{ width: 100 + "%" }}
                        />
                        <ValidationErrorMessage
                          message={errors.eventDescription}
                          touched={touched.eventDescription}
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