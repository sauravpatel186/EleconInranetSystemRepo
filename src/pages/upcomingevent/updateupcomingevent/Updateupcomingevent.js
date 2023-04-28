import React from "react";
import "./Updateupcomingevent.css";
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
export const Updateupcomingevent = () => {
  const [newannouncement, setnewannouncement] = useState([]);
  const [AllAnnouncement, setAllAnnouncement] = useState([]);
  const { type } = useParams();
  const idParamVal = useLocation().state.idParam;
  const [announcementData, setannouncementData] = useState({
    eventTitle: "",
    eventVenue: "",
    eventOrganizerName: "",
    eventDepartment: "",
    eventStartDate: "",
    eventEndDate: "",
    eventDescription: "",
    eventImage: "",
    eventRSVP: "",
  });
  const updateState = (e) => {
    setannouncementData((existingValue) => ({
      ...existingValue,
      eventVenue: e[0]["eventVenue"],
      eventTitle: e[0]["eventTitle"],
      eventDepartment: e[0]["eventDepartment"],
      eventOrganizerName: e[0]["eventOrganizerName"],
      eventRSVP: e[0]["eventRSVP"],
      eventDescription: e[0]["eventDescription"],
      eventEndDate: e[0]["eventEndDate"],
      eventImage: e[0]["eventImage"],
      eventStartDate: e[0]["eventStartDate"],
    }));
    //console.log(announcementData);
    //console.log(JSON.parse(localStorage.getItem("announcement")));
  };
  const getannouncementData = (id) => {
    let data = JSON.parse(localStorage.getItem("event"));
    if (data) {
      let edata = data.filter((announcements) => announcements.id === id);
      updateState(edata);
      setnewannouncement(data);
    } else {
      return [];
    }
  };
  useEffect(() => {
    try {
      getannouncementData(idParamVal);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const navigate = useHistory();
  const ValidationSchema = Yup.object().shape({
    eventTitle: Yup.string().required("Event Title is required."),
    eventDepartment: Yup.string().required("Event department is required."),
    eventRSVP: Yup.string().required("Event RSVP is required."),
    eventOrganizerName: Yup.string().required(
      "Event organizer name is required."
    ),
    eventVenue: Yup.string().required("Event venue is required."),
    eventStartDate: Yup.string().required("Start Date is required"),
    eventEndDate: Yup.string().required("End Date is required"),
    eventDescription: Yup.string().required("Event Description is required"),
    eventImage: Yup.string().required("Image is required"),
    
  });
  //Handles The Event when data is changed
  const UpdateData = (id, updatedData) => {
    const datawithId = newannouncement.find(e => e.id == id); // finds the element with id 
    if (datawithId["id"] === updatedData.id) {
        // let temp = JSON.parse(localStorage.getItem("achievement"));
        let tempdata = newannouncement.indexOf(newannouncement.find(announcement => announcement.id == id));
        newannouncement[tempdata] = updatedData
        setAllAnnouncement([...newannouncement])
        console.log(AllAnnouncement);
        // localStorage.setItem("announcement", JSON.stringify(AllAnnouncement));
        // navigate.push("/admindashboard/announcement");
    }
    
}
useEffect(()=>{
  if(AllAnnouncement.length>0){
    localStorage.setItem("event", JSON.stringify(AllAnnouncement));
    navigate.push("/admindashboard/upcomingevent");
  }
},[AllAnnouncement])
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
        setFieldValue("eventImage", reader.result);
      };
      reader.onerror = function (error) {
        throw error;
      };
    } else {
      toast.error("only jpg,jpeg and png files are allowed");
    }
  } else {
    setFieldValue("eventImage", "");
  }
};
  return (
    <div className="page-information-container">
      <header className="page-header">
        <label>Upcoming Event</label>
      </header>
      <div className="createupcomingevent-container">
        <div className="createupcomingevent-header">
          <Typography className="header-font" variant="body" gutterBottom>
            Update Upcoming Event
          </Typography>
        </div>
        <div className="form-line">
          <Divider sx={{ borderBottomWidth: 2 }} />
        </div>
        <Formik
          initialValues={announcementData}
          validationSchema={ValidationSchema}
          enableReinitialize
          onSubmit={(data) => {
            let upcomingevent = {
              id: idParamVal,
              eventVenue: data.eventVenue,
              eventTitle: data.eventTitle,
              eventOrganizerName: data.eventOrganizerName,
              eventDepartment: data.eventDepartment,
              eventStartDate: data.eventStartDate,
              eventEndDate: data.eventEndDate,
              eventRSVP: data.eventRSVP,
              eventDescription: data.eventDescription,
              eventImage: data.eventImage,
              time: Math.floor(Date.now() / 1000),
              isDeleted: false,
            }
            UpdateData(idParamVal, upcomingevent);
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
                    <TextField
                      label="Event Organizer"
                      name="eventOrganizerName"
                      type="eventOrganizerName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      value={values.eventOrganizerName}
                      sx={{ width: 100 + "%" }}
                    />
                    <ValidationErrorMessage
                      message={errors.eventOrganizerName}
                      touched={touched.eventOrganizerName}
                    />
                  </div>
                </div>
                <div className="formrow">
                  <div className="createeventforminput">
                    <FormControl sx={{ width: 100 + "%" }}>
                      <InputLabel id="demo-simple-select-autowidth-label">
                        Department
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth-label"
                        name="eventDepartment"
                        type="eventDepartment"
                        label="Department"
                        onChange={handleChange}
                        value={values.eventDepartment}>
                        <MenuItem value={"Department 1"}>Department 1</MenuItem>
                        <MenuItem value={"Department 2"}>Department 2</MenuItem>
                        <MenuItem value={"Department 3"}>Department 3</MenuItem>
                      </Select>
                    </FormControl>
                    <ValidationErrorMessage
                      message={errors.eventDepartment}
                      touched={touched.eventDepartment}
                    />
                  </div>
                  <div className="createeventforminput">
                    <TextField
                      label="Event Venue"
                      name="eventVenue"
                      type="eventVenue"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      value={values.eventVenue}
                      sx={{ width: 100 + "%" }}
                    />
                    <ValidationErrorMessage
                      message={errors.eventVenue}
                      touched={touched.eventVenue}
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
                        value={dayjs(values.eventStartDate)}
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
                        value={dayjs(values.eventEndDate)}
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
                  <div className="createeventforminput">
                    <FormControl sx={{ width: 100 + "%", marginTop: "1vh" }}>
                      <InputLabel id="demo-simple-select-autowidth-label">
                        RSVP
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth-label"
                        name="eventRSVP"
                        type="eventRSVP"
                        label="RSVP"
                        onChange={handleChange}
                        value={values.eventRSVP}>
                        <MenuItem value={"YES"}>YES</MenuItem>
                        <MenuItem value={"NO"}>No</MenuItem>
                      </Select>
                    </FormControl>
                    <ValidationErrorMessage
                      message={errors.eventRSVP}
                      touched={touched.eventRSVP}
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
                    <div className="form-col">
                      {!values.eventImage && (
                        <>
                          {" "}
                          <label
                            htmlFor="contained-button-file"
                            className="file-upload-btn">
                            <Input
                              id="contained-button-file"
                              type="file"
                              name="eventImage"
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
                              className="btn pink-btn">
                              Upload
                            </Button>
                          </label>
                          <ValidationErrorMessage
                            message={errors.eventImage}
                            touched={touched.eventImage}
                          />
                        </>
                      )}
                      {values.eventImage && (
                        <div className="uploaded-file-name">
                          <em>
                            <img
                              src={values.eventImage}
                              className="img-upload"
                              width="10rem"
                              height="10rem"
                              alt=""
                            />
                          </em>
                          <Button
                            style={{ marginLeft: 2 + "rem" }}
                            variant="contained"
                            component="span"
                            color="error"
                            onClick={() => {
                              setFieldValue("eventImage", "");
                            }}>
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
        {/* {console.log(announcementData.announcementDepartment)} */}
      </div>
    </div>
  );
};