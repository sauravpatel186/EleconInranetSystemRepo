import React from "react";
import "./Updateannouncement.css";
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
export const Updateannouncement = () => {
  const [newannouncement, setnewannouncement] = useState([]);
  const [AllAnnouncement, setAllAnnouncement] = useState([]);
  const { type } = useParams();
  const idParamVal = useLocation().state.idParam;
  const [announcementData, setannouncementData] = useState({
    announcementTitle: "",
    announcementDepartment: "",
    announcementStartDate: "",
    announcementEndDate: "",
    announcementDescription: "",
  });
  const updateState = (e) => {
    setannouncementData((existingValue) => ({
      ...existingValue,
      announcementDepartment: e[0]["announcementDepartment"],
      announcementTitle: e[0]["announcementTitle"],
      announcementDescription: e[0]["announcementDescription"],
      announcementEndDate: e[0]["announcementEndDate"].slice(0, 10),
      announcementStartDate: e[0]["announcementStartDate"].slice(0, 10),
    }));
    //console.log(announcementData);
    //console.log(JSON.parse(localStorage.getItem("announcement")));
  };
  const getannouncementData = (id) => {
    let data = JSON.parse(localStorage.getItem("announcement"));
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
    announcementTitle: Yup.string().required("Announcement Title is required."),
    announcementDepartment: Yup.string().required(
      "Announcement Department is required."
    ),
    announcementStartDate: Yup.string().required("Start Date is required"),
    announcementEndDate: Yup.string().required("End Date is required"),
    announcementDescription: Yup.string().required(
      "Announcement Description is required"
    ),
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
    localStorage.setItem("announcement", JSON.stringify(AllAnnouncement));
    navigate.push("/admindashboard/announcement");
  }
},[AllAnnouncement])
  return (
    <div className="page-information-container">
      <header className="page-header">
        <label>Announcement</label>
      </header>
      <div className="createevent-container">
        <div className="createevent-header">
          <Typography className="header-font" variant="body" gutterBottom>
            Update Announcement
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
            let announcement = {
              id: idParamVal,
              announcementTitle: data.announcementTitle,
              announcementDepartment: data.announcementDepartment,
              announcementStartDate: data.announcementStartDate,
              announcementEndDate: data.announcementEndDate,
              announcementDescription: data.announcementDescription,
              time: Math.floor(Date.now() / 1000),
              isDeleted: false,
            }
            UpdateData(idParamVal, announcement);
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
                      label="Announcement Title"
                      name="announcementTitle"
                      type="announcementTitle"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      value={values.announcementTitle}
                      sx={{ width: 100 + "%" }}
                    />
                    <ValidationErrorMessage
                      message={errors.announcementTitle}
                      touched={touched.announcementTitle}
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
                    <ValidationErrorMessage
                      message={errors.announcementDepartment}
                      touched={touched.announcementDepartment}
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
                        value={dayjs(values.announcementStartDate)}
                        format="DD-MM-YYYY"
                        sx={{ width: 100 + "%" }}
                        onChange={(newValue) =>
                          setFieldValue("announcementStartDate", newValue)
                        }
                        // disablePast
                      />
                    </DemoContainer>
                    <ValidationErrorMessage
                      message={errors.announcementStartDate}
                      touched={touched.announcementStartDate}
                    />
                  </div>
                  <div className="createeventforminput">
                    <DemoContainer required components={["DatePicker"]}>
                      <DatePicker
                        label="End Date"
                        value={dayjs(values.announcementEndDate)}
                        format="DD-MM-YYYY"
                        sx={{ width: 100 + "%" }}
                        onChange={(newValue) =>
                          setFieldValue("announcementEndDate", newValue)
                        }
                        //disablePast
                      />
                    </DemoContainer>
                    <ValidationErrorMessage
                      message={errors.announcementEndDate}
                      touched={touched.announcementEndDate}
                    />
                  </div>
                </div>
                <div className="formrow">
                  <div className="createeventforminput">
                    <TextField
                      id="outlined-multiline-static"
                      label="Announcement Description"
                      multiline
                      value={values.announcementDescription}
                      rows={4}
                      name="announcementDescription"
                      type="announcementDescription"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{ width: 100 + "%" }}
                    />
                    <ValidationErrorMessage
                      message={errors.announcementDescription}
                      touched={touched.announcementDescription}
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
        {console.log(announcementData.announcementDepartment)}
      </div>
    </div>
  );
};
