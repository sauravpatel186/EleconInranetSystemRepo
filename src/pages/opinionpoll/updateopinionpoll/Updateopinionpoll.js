import React from "react";
import "./Updateopinionpoll.css";
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
export const Updateopinionpoll = () => {
  const { type } = useParams();
  const idParamVal = useLocation().state.idParam;
  const [opinionData, setopinionData] = useState({
    opinionTitle: "",
    opinionType: "",
    opinionStartDate: "",
    opinionEndDate: "",
    opinionDescription: "",
  });
  // const initialValue = {
  //     eventTitle: "",
  //     eventVenue:"",
  //     eventOrganizerName:"",
  //     eventDepartment:"",
  //     eventStartDate:"",
  //     eventEndDate: "",
  //     eventDescription:"",
  //     eventImage:"",
  //     eventRSVP:""
  // }
  const updateState = (e) => {
    setopinionData((existingValue) => ({
      ...existingValue,
      opinionType: e[0]["opinionType"],
      opinionTitle: e[0]["opinionTitle"],
      opinionDescription: e[0]["opinionDescription"],
      opinionEndDate: e[0]["opinionEndDate"].slice(0, 10),
      opinionStartDate: e[0]["opinionStartDate"].slice(0, 10),
    }));
    console.log(opinionData);
    console.log(JSON.parse(localStorage.getItem("opinionpoll")));
  };
  const geteventData = (id) => {
    let data = JSON.parse(localStorage.getItem("opinionpoll"));
    if (data) {
      let edata = data.filter((events) => events.id === id);
      updateState(edata);

      // console.log(achievementData);
      // initialValue.achievementType = achievementData[0]["achievementType"];
      // initialValue.achievementTitle = achievementData[0]["achievementTile"];
      // initialValue.employeeIdandName = achievementData[0]["employeeIdandName"];
      // initialValue.achievementArea = achievementData[0]["achievementArea"];
      // initialValue.achievementStartDate = achievementData[0]["achievementStatDate"];
      // initialValue.achievementEndDate = achievementData[0]["achievementEndDate"];
      // initialValue.achievementDescription = achievementData[0]["achievementDescritpion"];
      // initialValue.achievementImage = achievementData[0]["achievementImage"];
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
  const [newopinon, setnewopinion] = useState([]);
  const ValidationSchema = Yup.object().shape({
    opinionTitle: Yup.string().required("Opinion Title is required."),
    opinionType: Yup.string().required("Opinion Type is required."),
    opinionStartDate: Yup.string().required("Start Date is required"),
    opinionEndDate: Yup.string().required("End Date is required"),
    opinionDescription: Yup.string().required("Opinion Description is required"),
    
  });
//   const onSelectFile = (e, setFieldValue, setFieldError) => {
//     const files = e.target.files;
//     if (files?.length) {
//       const fileSelected = e.target.files[0];
//       const fileNameArray = fileSelected.name.split(".");
//       const extension = fileNameArray.pop();
//       if (["png", "jpg", "jpeg"].includes(extension?.toLowerCase())) {
//         const reader = new FileReader();
//         reader.readAsDataURL(fileSelected);
//         reader.onload = function () {
//           setFieldValue("eventImage", reader.result);
//         };
//         reader.onerror = function (error) {
//           throw error;
//         };
//       } else {
//         toast.error("only jpg,jpeg and png files are allowed");
//       }
//     } else {
//       setFieldValue("eventImage", "");
//     }
//   };

  return (
    <div className="page-information-container">
      <header className="page-header">
        <label>Opinion Poll</label>
      </header>
      <div className="createevent-container">
        <div className="createevent-header">
          <Typography className="header-font" variant="body" gutterBottom>
            Update Opinion Poll
          </Typography>
        </div>
        <div className="form-line">
          <Divider sx={{ borderBottomWidth: 2 }} />
        </div>
        <Formik
          initialValues={opinionData}
          validationSchema={ValidationSchema}
          enableReinitialize
          onSubmit={(data) => {
            let event = {
              id: Math.random(),
              opinionType: data.opinionType,
              opinionTitle: data.opinionTitle,
              opinionStartDate: data.opinionStartDate,
              opinionEndDate: data.opinionEndDate,
              opinionDescription: data.opinionDescription,
              time: Math.floor(Date.now() / 1000),
              isDeleted: false,
            };
            // eventData.push(event);
            // seteventData([...eventData]);
            // localStorage.setItem("event",JSON.stringify(eventData));
            // toast("Stored Successfully");
            // navigate.push("/upcomingevent");
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
                      label="Opinion Title"
                      name="opinionTitle"
                      type="opinionTitle"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      value={values.opinionTitle}
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
                        value={dayjs(values.opinionStartDate)}
                        format="DD-MM-YYYY"
                        sx={{ width: 100 + "%" }}
                        onChange={(newValue) =>
                          setFieldValue("opinionStartDate", newValue)
                        }
                        // disablePast
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
                        value={dayjs(values.opinionEndDate)}
                        format="DD-MM-YYYY"
                        sx={{ width: 100 + "%" }}
                        onChange={(newValue) =>
                          setFieldValue("opinionEndDate", newValue)
                        }
                        //disablePast
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
                      value={values.opinionDescription}
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
