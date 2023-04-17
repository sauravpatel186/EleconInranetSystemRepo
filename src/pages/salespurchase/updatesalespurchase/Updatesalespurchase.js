import React from "react";
import "./Updatesalespurchase.css";
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
export const Updatesalespurchase = () => {
  const [newannouncement, setnewannouncement] = useState([]);
  const [AllAnnouncement, setAllAnnouncement] = useState([]);
  const { type } = useParams();
  const idParamVal = useLocation().state.idParam;
  const [announcementData, setannouncementData] = useState({
            salespurchaseType: "",
            salespurchaseTitle: "",
            salespurchaseMNumber: "",
            salespurchaseDescription: "",
            salespurchaseImage: "",
  });
  const updateState = (e) => {
    setannouncementData((existingValue) => ({
      ...existingValue,
      salespurchaseType: e[0]["salespurchaseType"],
      salespurchaseTitle: e[0]["salespurchaseTitle"],
      salespurchaseDescription: e[0]["salespurchaseDescription"],
      salespurchaseMNumber: e[0]["salespurchaseMNumber"],
      salespurchaseImage: e[0]["salespurchaseImage"]
    }));
    //console.log(announcementData);
    //console.log(JSON.parse(localStorage.getItem("announcement")));
  };
  const getannouncementData = (id) => {
    let data = JSON.parse(localStorage.getItem("salespurchase"));
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
    localStorage.setItem("salespurchase", JSON.stringify(AllAnnouncement));
    navigate.push("/admindashboard/salespurchase");
  }
},[AllAnnouncement])
  return (
    <div className="page-information-container">
      <header className="page-header">
        <label>Sales/Purchase</label>
      </header>
      <div className="createevent-container">
        <div className="createevent-header">
          <Typography className="header-font" variant="body" gutterBottom>
            Update Ad
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
            let ad = {
              id: idParamVal,
              salespurchaseTitle: data.salespurchaseTitle,
              salespurchaseType: data.salespurchaseType,
              salespurchaseImage: data.salespurchaseImage,
              salespurchaseMNumber: data.salespurchaseMNumber,
              salespurchaseDescription: data.salespurchaseDescription,
              time: Math.floor(Date.now() / 1000),
              isDeleted: false,
              isApproved: true,
            }
            UpdateData(idParamVal, ad);
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
                      value={values.salespurchaseTitle}
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
                      value={values.salespurchaseMNumber}
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
                      value={values.salespurchaseDescription}
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
                <div className="createachievementforminput">
                                        <div className="form-col">
                                            {!values.salespurchaseImage && (
                                                <>
                                                    {" "}
                                                    <label
                                                        htmlFor="contained-button-file"
                                                        className="file-upload-btn"
                                                    >
                                                        <Input
                                                            id="contained-button-file"
                                                            type="file"
                                                            name="salespurchaseImage"
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
                                                        message={errors.salespurchaseImage}
                                                        touched={touched.salespurchaseImage}
                                                    />
                                                </>
                                            )}
                                            {values.salespurchaseImage && (
                                                <div className="uploaded-file-name">
                                                    <em>
                                                        <img src={values.salespurchaseImage} className="img-upload" width="10rem" height="10rem" alt="" />
                                                    </em>
                                                    <Button
                                                        style={{ marginLeft: 2 + "rem" }}
                                                        variant="contained"
                                                        component="span"
                                                        color="error"
                                                        onClick={() => {
                                                            setFieldValue("salespurchaseImage", "");
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
        {console.log(announcementData.salespurchaseTitle)}
      </div>
    </div>
  );
};
