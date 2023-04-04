import React from 'react'
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./createopinionpoll.css";
import { Breadcrumbs, Divider } from "@mui/material";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateField } from "@mui/x-date-pickers/DateField";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import {useHistory} from "react-router-dom";

const Createopinionpoll = () => {
  return (
    <div>
      <div className="page-information-container">
        <header className="page-header">
          <label>Opinion Poll</label>
        </header>
        <div className='page-breadscrumb'>
              <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/" exact to="/">
                  Home
                </Link>
                <Link
                  underline="hover" color="inherit" href="/opinionpoll" exact to="/opinionpoll">
                  Opinion Poll
                </Link>
                <Link
                  underline="hover"
                  color="text.primary"
                  href="/opinionpoll/createopinionpoll"
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
          </div>
          </div>
    </div>
  )
}

export default Createopinionpoll
