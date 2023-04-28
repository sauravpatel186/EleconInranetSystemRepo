import React from "react";
//import "./Updateannouncement.css";
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
const Updatecanteenmenu = () => {
  const [newannouncement, setnewannouncement] = useState([]);
  const [AllAnnouncement, setAllAnnouncement] = useState([]);
  const { type } = useParams();
  const idParamVal = useLocation().state.idParam;
  const [menuData, setmenuData] = useState({
    newmenuBreakfastFood: "",
    newmenuBreakfastBeverage: "",
    newmenuLunchFood: "",
    newmenuLunchBeverage: "",
  });
  const updateState = (e) => {
    setmenuData((existingValue) => ({
      ...existingValue,
      newmenuBreakfastFood: e[0]["newmenuBreakfastFood"],
      newmenuBreakfastBeverage: e[0]["newmenuBreakfastBeverage"],
      newmenuLunchFood: e[0]["newmenuLunchFood"],
      newmenuLunchBeverage: e[0]["newmenuLunchBeverage"],
    }));
    //console.log(announcementData);
    //console.log(JSON.parse(localStorage.getItem("announcement")));
  };
  const getannouncementData = (id) => {
    let data = JSON.parse(localStorage.getItem("canteenmenu"));
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
    newmenuBreakfastFood: Yup.string().required(
        "Breakfast Food items required."),
      newmenuBreakfastBeverage: Yup.string().required("Beverage items required."),
      newmenuLunchFood: Yup.string().required("Lunch Food items are required"),
      newmenuLunchBeverage: Yup.string().required("Lunch Beverage items are required"),
  });
  //Handles The Event when data is changed
  const UpdateData = (id, updatedData) => {
    const datawithId = newannouncement.find((e) => e.id == id); // finds the element with id
    if (datawithId["id"] === updatedData.id) {
      // let temp = JSON.parse(localStorage.getItem("achievement"));
      let tempdata = newannouncement.indexOf(
        newannouncement.find((announcement) => announcement.id == id)
      );
      newannouncement[tempdata] = updatedData;
      setAllAnnouncement([...newannouncement]);
      console.log(AllAnnouncement);
      // localStorage.setItem("announcement", JSON.stringify(AllAnnouncement));
      // navigate.push("/admindashboard/announcement");
    }
  };
  useEffect(() => {
    if (AllAnnouncement.length > 0) {
      localStorage.setItem("canteenmenu", JSON.stringify(AllAnnouncement));
      navigate.push("/admindashboard/canteenmenu");
    }
  }, [AllAnnouncement]);
  return (
    <div className="page-information-container">
      <header className="page-header">
        <label>Canteen Menu</label>
      </header>
      <div className="createevent-container">
        <div className="createevent-header">
          <Typography className="header-font" variant="body" gutterBottom>
            Update Canteen Menu
          </Typography>
        </div>
        <div className="form-line">
          <Divider sx={{ borderBottomWidth: 2 }} />
        </div>
        <Formik
          initialValues={menuData}
          validationSchema={ValidationSchema}
          enableReinitialize
          onSubmit={(data) => {
            let announcement = {
              id: idParamVal,
              newmenuBreakfastFood: data.newmenuBreakfastFood,
              newmenuBreakfastBeverage: data.newmenuBreakfastBeverage,
              newmenuLunchBeverage: data.newmenuLunchBeverage,
              newmenuLunchFood: data.newmenuLunchFood,
              time: Math.floor(Date.now() / 1000),
              isDeleted: false,
            };
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
                  <Typography
                    className="header-font"
                    variant="body"
                    gutterBottom>
                    Breakfast Menu
                  </Typography>
                </div>
                <div className="formrow">
                  <div className="createeventforminput">
                    <TextField
                      id="outlined-multiline-static"
                      label="Breakfast Food Items"
                      multiline
                      rows={2}
                      value={values.newmenuBreakfastFood}
                      name="newmenuBreakfastFood"
                      type="newmenuBreakfastFood"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{ width: 100 + "%" }}
                    />
                    <ValidationErrorMessage
                      message={errors.newmenuBreakfastFood}
                      touched={touched.newmenuBreakfastFood}
                    />
                  </div>
                  <div className="createeventforminput">
                    <TextField
                      id="outlined-multiline-static"
                      label="Breakfast Beverage Items"
                      multiline
                      rows={2}
                      value={values.newmenuBreakfastBeverage}
                      name="newmenuBreakfastBeverage"
                      type="newmenuBreakfastBeverage"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{ width: 100 + "%" }}
                    />
                    <ValidationErrorMessage
                      message={errors.newmenuBreakfastBeverage}
                      touched={touched.newmenuBreakfastBeverage}
                    />
                  </div>
                </div>
                <div className="formrow">
                  <Typography
                    className="header-font"
                    variant="body"
                    gutterBottom>
                    Lunch Menu
                  </Typography>
                </div>
                <div className="formrow">
                  <div className="createeventforminput">
                    <TextField
                      id="outlined-multiline-static"
                      label="Lunch Food Items"
                      multiline
                      rows={2}
                      value={values.newmenuLunchFood}
                      name="newmenuLunchFood"
                      type="newmenuLunchFood"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{ width: 100 + "%" }}
                    />
                    <ValidationErrorMessage
                      message={errors.newmenuLunchFood}
                      touched={touched.newmenuLunchFood}
                    />
                  </div>
                  <div className="createeventforminput">
                    <TextField
                      id="outlined-multiline-static"
                      label="Lunch Beverage Items"
                      multiline
                      rows={2}
                      value={values.newmenuLunchBeverage}
                      name="newmenuLunchBeverage"
                      type="newmenuLunchBeverage"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{ width: 100 + "%" }}
                    />
                    <ValidationErrorMessage
                      message={errors.newmenuLunchBeverage}
                      touched={touched.newmenuLunchBeverage}
                    />
                  </div>
                </div>
                {/* <div className="formrow">
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
                </div> */}
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
        {console.log(menuData.newmenuBreakfastBeverage)}
      </div>
    </div>
  );
};
export default Updatecanteenmenu
