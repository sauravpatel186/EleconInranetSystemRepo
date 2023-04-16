import React from 'react'
import "./Login.css";
import * as Yup from "yup";
import { FormControl, Button, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Formik } from 'formik';
export const Login = () => {

    const [user,setUser]=("");
    const validationSchema = {
        email: Yup.string().email("Email Format is not valid").required("Email is required"),
        password: Yup.string().required(),
        role: Yup.string().required("Password is required")
    }

    const handleSubmit = () => {
        const loggedInUser = JSON.parse(localStorage.getItem("employeeData"));
        if (loggedInUser) {}
        else{
            console.log("No Data Available");
        }
    } 
    return (
        <>
            <div className="login-container">
                <div className="login-form">
                    <div className='login-form-header'>
                        <img src="/Elecon_engineering_logo.png" alt="Elecon Logo" />
                    </div>
                    <Formik
                    initialValues={{
                        email : "",
                        password : "",
                        role : "" 
                    }}
                    validationSchema={validationSchema}
                    onSubmit={data => {
                        let user = {
                            email : data.email,
                            password : data.password,
                            role : data.role
                        }
                        setUser(user);
                    
                        }
                    }
                >
                {({ values, handleChange, handleBlur, errors, handleSubmit, touched, setFieldValue, setFieldError }) => (
                        <form onSubmit={handleSubmit}>
                    <div className="login-form-input">
                        <div className="email-input">
                            <TextField name="email" type='email' required label='Email' sx={{ width: 100 + "%" }} onChange={handleChange} onBlur={handleBlur}/>
                        </div>
                        <TextField name="password" type='password' required label='Password' sx={{ width: 100 + "%" }} onChange={handleChange} onBlur={handleBlur} />
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
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="normal">Normal</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="login-form-button">
                        <Button variant='contained' fullWidth  type="submit">Login</Button>
                    </div>
                    </form>
                )}
                </Formik>
                </div>
            </div>
        </>
    )
}
