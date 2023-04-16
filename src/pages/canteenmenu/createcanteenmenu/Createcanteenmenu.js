import * as React from "react";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./Createcanteenmenu.css";
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

const Createcanteenmenu = () => {
  const navigate = useHistory();
  const [newmenu, setnewmenu] = useState([]);
  const ValidationSchema = Yup.object().shape({
    newmenuBreakfastFood: Yup.string().required(
      "Breakfast Food items required."
    ),
    newmenuBreakfastBeverage: Yup.string().required("Beverage items required."),
    newmenuLunchFood: Yup.string().required("Lunch Food items are required"),
    newmenuLunchBeverage: Yup.string().required(
      "Lunch Beverage items are required"
    ),
  });
  useEffect(() => {
    let data = localStorage.getItem("canteenmenu");
    if (data) {
      setnewmenu(JSON.parse(data));
    }
  }, []);
  return (
    <div className="page-information-container">
      <header className="page-header">
        <label>Canteen Menu</label>
      </header>
      <div className="page-breadscrumb">
        <br />
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            href="/admindashboard"
            exact
            to="/admindashboard">
            Home
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/admindashboard/canteenmenu"
            exact
            to="/admindashboard/canteenmenu">
            Canteen Menu
          </Link>
          <Link
            underline="hover"
            color="text.primary"
            href="/admindashboard/canteenmenu/createcanteenmenu"
            aria-current="page">
            Create Canteen Menu
          </Link>
        </Breadcrumbs>
      </div>
      <div className="createupcomingevent-container">
        <div className="createupcomingevent-header">
          <Typography className="header-font" variant="body" gutterBottom>
            Create a new Canteen Menu
          </Typography>
        </div>
        <div className="form-line">
          <Divider sx={{ borderBottomWidth: 2 }} />
        </div>
        <Formik
          initialValues={{
            newmenuBreakfastFood: "",
            newmenuBreakfastBeverage: "",
            newmenuLunchFood: "",
            newmenuLunchBeverage: "",
          }}
          validationSchema={ValidationSchema}
          onSubmit={(data) => {
            let menu = {
              id: Math.random(),
              newmenuBreakfastFood: data.newmenuBreakfastFood,
              newmenuBreakfastBeverage: data.newmenuBreakfastBeverage,
              newmenuLunchBeverage: data.newmenuLunchBeverage,
              newmenuLunchFood: data.newmenuLunchFood,
              time: Math.floor(Date.now() / 1000),
              isDeleted: false,
            };
            newmenu.push(menu);
            setnewmenu([...newmenu]);
            localStorage.setItem("canteenmenu", JSON.stringify(newmenu));
            toast("Stored Successfully");
            navigate.push("/admindashboard/canteenmenu");
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
                <div className="createupcomingevent-header">
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
                <div className="createupcomingevent-header">
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

export default Createcanteenmenu;
