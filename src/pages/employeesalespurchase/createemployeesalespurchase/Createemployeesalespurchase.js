import * as React from "react";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./Createemployeesalespurchase.css";
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

const Createemployeesalespurchase = () => {
  const navigate = useHistory();
  const [newsalespurchase, setnewsalespurchase] = useState([]);
  const ValidationSchema = Yup.object().shape({
    salespurchaseTitle: Yup.string().required("Ad Title is required"),
    salespurchaseMNumber:Yup.string().required("Phone number is required"),
    salespurchaseType: Yup.string().required("AD type is required"),
    salespurchaseDescription: Yup.string().required("Description is required"),
    salespurchaseImage:Yup.string().required("Image is required")
  });
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
          setFieldValue("salespurchaseImage", reader.result);
        };
        reader.onerror = function (error) {
          throw error;
        };
      } else {
        toast.error("only jpg,jpeg and png files are allowed");
      }
    } else {
      setFieldValue("salespurchaseImage", "");
    }
  };
  useEffect(() => {
    let data = localStorage.getItem("salespurchase");
    if (data) {
      setnewsalespurchase(JSON.parse(data));
    }
  }, []);
  return (
    <div className="page-information-container">
      <header className="page-header">
        <label>Sales/Purchase</label>
      </header>
      <div className="page-breadscrumb">
        <br />
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            href="/employeedashboard"
            exact
            to="/employeedashboard">
            Home
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/employeedashboard/announcement"
            exact
            to="/employeedashboard/salespurchase">
            Sale/Purchase
          </Link>
          <Link
            underline="hover"
            color="text.primary"
            href="/employeedashboard/salespurchase/createsalespurchase"
            aria-current="page">
            Create AD
          </Link>
        </Breadcrumbs>
      </div>
      <div className="createupcomingevent-container">
        <div className="createupcomingevent-header">
          <Typography className="header-font" variant="body" gutterBottom>
            Create a new AD
          </Typography>
        </div>
        <div className="form-line">
          <Divider sx={{ borderBottomWidth: 2 }} />
        </div>
        <Formik
          initialValues={{
            salespurchaseType: "",
            salespurchaseTitle: "",
            salespurchaseMNumber: "",
            salespurchaseDescription: "",
            salespurchaseImage: "",
          }}
          validationSchema={ValidationSchema}
          onSubmit={(data) => {
            let ad = {
              id: Math.random(),
              salespurchaseTitle: data.salespurchaseTitle,
              salespurchaseType: data.salespurchaseType,
              salespurchaseMNumber: data.salespurchaseMNumber,
              salespurchaseImage: data.salespurchaseImage,
              salespurchaseDescription: data.salespurchaseDescription,
              time: Math.floor(Date.now() / 1000),
              isApproved: false,
              isDeleted: false,
            };
            newsalespurchase.push(ad);
            setnewsalespurchase([...newsalespurchase]);
            localStorage.setItem(
              "salespurchase",
              JSON.stringify(newsalespurchase)
            );
            toast("Stored Successfully");
            navigate.push("/employeedashboard/salespurchase");
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
                      label="AD Title"
                      name="salespurchaseTitle"
                      type="salespurchaseTitle"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      sx={{ width: 100 + "%" }}
                    />
                    <ValidationErrorMessage
                      message={errors.salespurchaseTitle}
                      touched={touched.salespurchaseTitle}
                    />
                  </div>
                </div>
                <div className="formrow">
                  <div className="createeventforminput">
                    <FormControl sx={{ width: 100 + "%" }}>
                      <InputLabel id="demo-simple-select-autowidth-label">
                        AD TYPE
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth-label"
                        name="salespurchaseType"
                        type="salespurchaseType"
                        label="AD TYPE"
                        onChange={handleChange}
                        value={values.salespurchaseType}>
                        <MenuItem value={"Sale"}>Sale</MenuItem>
                        <MenuItem value={"Purchase"}>Purchase</MenuItem>
                      </Select>
                    </FormControl>
                    <ValidationErrorMessage
                      message={errors.salespurchaseType}
                      touched={touched.salespurchaseType}
                    />
                  </div>
                  <div className="createeventforminput">
                    <TextField
                      label="Mobile Number"
                      name="salespurchaseMNumber"
                      type="salespurchaseMNumber"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      sx={{ width: 100 + "%" }}
                    />
                    <ValidationErrorMessage
                      message={errors.salespurchaseMNumber}
                      touched={touched.salespurchaseMNumber}
                    />
                  </div>
                </div>
                <div className="formrow">
                  <div className="createeventforminput">
                    <TextField
                      id="outlined-multiline-static"
                      label="AD Description"
                      multiline
                      rows={4}
                      name="salespurchaseDescription"
                      type="salespurchaseDescription"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{ width: 100 + "%" }}
                    />
                    <ValidationErrorMessage
                      message={errors.salespurchaseDescription}
                      touched={touched.salespurchaseDescription}
                    />
                  </div>
                </div>
                <div className="formrow">
                  <div className="createeventforminput">
                    <div className="form-col">
                      {!values.salespurchaseImage && (
                        <>
                          {" "}
                          <label
                            htmlFor="contained-button-file"
                            className="file-upload-btn">
                            <Input
                              id="contained-button-file"
                              type="file"
                              name="salespurchaseImage"
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
                            message={errors.salespurchaseImage}
                            touched={touched.salespurchaseImage}
                          />
                        </>
                      )}
                      {values.salespurchaseImage && (
                        <div className="uploaded-file-name">
                          <em>
                            <img
                              src={values.salespurchaseImage}
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
                              setFieldValue("salespurchaseImage", "");
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
      </div>
    </div>
  );
};

export default Createemployeesalespurchase;
