import React, { useState } from 'react'
import "./Login.css";
import * as Yup from "yup";
import { FormControl, Button, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { ErrorMessage, Formik } from 'formik';
import { ValidationErrorMessage } from '../../components/ValidationErrorMessage/ValidationErrorMessage';
import { login } from '../../service/authservice';
import { el } from 'date-fns/locale';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
export const Login = (props) => {
    const history = useHistory();
    const [user, setUser] = useState();
    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Email Format is not valid").required("Email is required"),
        password: Yup.string().required("Password is required"),
        role: Yup.string().required("Please select a role")
    });

    const loginData = async (e) => {
        // const loggedInUser = JSON.parse(localStorage.getItem("employeeData"));
        // if (loggedInUser) {}
        // else{
        //     console.log("No Data Available");
        // }
        try {

            const response = await login(e.email, e.password, e.role);
            console.log(response.length);
            if (response.length > 0) {

                // localStorage.setItem("isLogin", JSON.stringify(true))
                toast.success("Login successful")
                props.setisLoggedIn(true)
            }
            else {
                console.log("Login Failure");
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    return (
        <>
            <ToastContainer />
            <div className="login-container">
                <div className="login-form">
                    <div className='login-form-header'>
                        <img src="/Elecon_engineering_logo.png" alt="Elecon Logo" />
                    </div>
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                            role: ""
                        }}
                        validationSchema={validationSchema}
                        onSubmit={data => {
                            let user = {
                                email: data.email,
                                password: data.password,
                                role: data.role
                            }
                            setUser(user);
                            loginData(user);

                        }
                        }
                    >
                        {({ values, handleChange, handleBlur, errors, handleSubmit, touched, setFieldValue, setFieldError }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="login-form-input">
                                    <div className="email-input">
                                        <TextField name="email" type='email' required label='Email' sx={{ width: 100 + "%" }} onChange={handleChange} onBlur={handleBlur} />
                                        <ValidationErrorMessage message={errors.email} touched={errors.email} />
                                    </div>
                                    <TextField name="password" type='password' required label='Password' sx={{ width: 100 + "%" }} onChange={handleChange} onBlur={handleBlur} />
                                    <ValidationErrorMessage message={errors.password} touched={errors.password} />
                                    <FormControl sx={{ width: 100 + "%" }}>
                                        <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name="role"
                                            type='role'
                                            onChange={handleChange}
                                            value={values.role}
                                            // value={age}
                                            label="Age"
                                        // onChange={handleChange}
                                        >
                                            <MenuItem value="Admin">Admin</MenuItem>
                                            <MenuItem value="Normal">Normal</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <ValidationErrorMessage message={errors.role} touched={errors.role} />
                                </div>
                                <div className="login-form-button">
                                    <Button variant='contained' fullWidth type="submit">Login</Button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    )
}
