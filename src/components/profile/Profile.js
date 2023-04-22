import React, { useState, useEffect } from 'react'

import { Menu, MenuItem, useMediaQuery, useTheme, Dialog, DialogActions, DialogTitle, Button, DialogContent, DialogContentText, TextField } from '@mui/material'
import { Formik } from 'formik'
import * as Yup from "yup";
import { toast } from "react-toastify"
import { ValidationErrorMessage } from '../ValidationErrorMessage/ValidationErrorMessage';

export const Profile = () => {
    const [newprofile, setNewProfile] = useState([]);
    const [allprofile, setAllProfile] = useState([]);
    const [profileData, setProfileData] = useState({
        "njFirstName": "",
        "njLastName": "",
        "njMiddleName": "",
        "njMobileNo": "",
        "njEmail": "",
        "njPassword": "",
        "njAddress": "",
        "njImage": "",
        "njDesignation": "",
    });
    let ValidationSchema = Yup.object().shape({
        njFirstName: Yup.string().required("FirstName is required"),
        njMiddleName: Yup.string().required("MiddleName is required"),
        njLastName: Yup.string().required("LastName is required"),
        njMobileNo: Yup.string().required("Mobile is required"),
        njEmail: Yup.string().email().required("Email is required"),
        njPassword: Yup.string().required("Password is required"),
        confirmPassword: Yup.string().oneOf([Yup.ref('njPassword'), null], "Passwords must match").required("Confirm Password is required"),
        njAddress: Yup.string().required("Address is required"),
        njImage: Yup.string().required("Image is required"),
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
                    setFieldValue("profileImage", reader.result);
                };
                reader.onerror = function (error) {
                    throw error;
                };
            } else {
                toast.error("only jpg,jpeg and png files are allowed");
            }
        } else {
            setFieldValue("njImage", "");
        }
    };
    const updateState = (e) => {
        setProfileData(existingValue => ({
            ...existingValue,
            njFirstName: e[0].njFirstName,
            njLastName: e[0].njLastName,
            njMiddleName: e[0].njMiddleName,
            njMobileNo: e[0].njMobileNo,
            njAddress: e[0].njAddress,
            njEmail: e[0].njEmail,
            njPassword: e[0].njPassword,
            njImage: e[0].njImage,
            njDesignation: e[0].njDesignation,
        })

        )

    }
    const UpdateData = (id, updatedData) => {
        const datawithId = newprofile.find(e => e.id == id); // finds the element with id 
        if (datawithId["id"] === updatedData.id) {
            let temp = JSON.parse(localStorage.getItem("nj"));
            let tempdata = temp.indexOf(temp.find(profiles => profiles.id == id));
            temp[tempdata].id = updatedData.id;
            temp[tempdata].njAddress = updatedData.njAddress;
            temp[tempdata].njFirstName = updatedData.njFirstName;
            temp[tempdata].njLastName = updatedData.njLastName;
            temp[tempdata].njEmail = updatedData.njEmail;
            temp[tempdata].njDesignation = updatedData.njDesignation;
            temp[tempdata].njPassword = updatedData.njPassword;
            temp[tempdata].njMiddleName = updatedData.njMiddleName;
            temp[tempdata].njMobileNo = updatedData.njMobileNo;
            temp[tempdata].njImage = updatedData.njImage;

            newprofile[0].njAddress = updatedData.njAddress;
            newprofile[0].njFirstName = updatedData.njFirstName;
            newprofile[0].njLastName = updatedData.njLastName;
            newprofile[0].njEmail = updatedData.njEmail;
            newprofile[0].njDesignation = updatedData.njDesignation;
            newprofile[0].njPassword = updatedData.njPassword;
            newprofile[0].njMiddleName = updatedData.njMiddleName;
            newprofile[0].njMobileNo = updatedData.njMobileNo;
            newprofile[0].njImage = updatedData.njImage;
            setAllProfile([...temp]);

            // setAllAchievement([...temp])
            // console.log(allachievement);
        }


    }
    useEffect(() => {

        if (allprofile.length > 0) {
            localStorage.setItem('nj', JSON.stringify(allprofile));
            localStorage.setItem('user', JSON.stringify(newprofile));
        }
    }, [allprofile])
    const getAchievementData = () => {
        let data = JSON.parse(localStorage.getItem("user"));
        if (data) {
            updateState(data);

            setNewProfile(data);
        } else {
            return [];
        }
    }
    useEffect(() => {
        try {
            getAchievementData()
        }
        catch (error) {
            console.log(error);
        }
    }, [])
    return (
        <div className='profile-dialog-container'>
            <Formik
                initialValues={profileData}
                validationSchema={ValidationSchema}
                enableReinitialize
                onSubmit={data => {
                    let profile = {
                        id: newprofile[0].id,
                        njFirstName: data.njFirstName,
                        njMiddleName: data.njMiddleName,
                        njLastName: data.njLastName,
                        njMobileNo: data.njMobileNo,
                        njEmail: data.njEmail,
                        njPassword: data.njPassword,
                        njAddress: data.njAddress,
                        njImage: data.njImage,
                        njDesignation: data.njDesignation,
                    }
                    UpdateData(profile.id, profile);
                }}
            >
                {({ values, handleChange, handleBlur, errors, handleSubmit, touched, setFieldValue, setFieldError }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="profile-row">
                            <div className="createprofileforminput">
                                <TextField variant='outlined' onBlur={handleBlur} value={values.njFirstName} onChange={handleChange} name="njFirstName" type='FirstName' label="First Name" required sx={{ marginTop: 1 + "rem" }} />
                                <ValidationErrorMessage message={errors.njFirstName} touched={touched.njFirstName} />
                            </div>
                            <div className="createprofileforminput">
                                <TextField variant='outlined' value={values.njMiddleName} onBlur={handleBlur} onChange={handleChange} name='njMiddleName' type='MiddleName' label="Middle Name" required sx={{ marginTop: 1 + "rem" }} />
                                <ValidationErrorMessage message={errors.njMiddleName} touched={touched.njMiddleName} />

                            </div>
                            <div className="createprofileforminput">
                                <TextField variant='outlined' value={values.njLastName} onBlur={handleBlur} onChange={handleChange} name="njLastName" type='LastName' label="Last Name" required sx={{ marginTop: 1 + "rem" }} />
                                <ValidationErrorMessage message={errors.njLastName} touched={touched.njLastName} />
                            </div>
                        </div>

                        <div className="profile-row">
                            <div className="createprofileforminput">
                                <TextField variant='outlined' name='njMobileNo' value={values.njMobileNo} onBlur={handleBlur} onChange={handleChange} type='mobile' label="Mobile" required sx={{ marginTop: 1 + "rem" }} />
                                <ValidationErrorMessage message={errors.njMobileNo} touched={touched.njMobileNo} />
                            </div>
                            <div className="createprofileforminput">
                                <TextField variant='outlined' name='njEmail' type='email' onBlur={handleBlur} onChange={handleChange} value={values.njEmail} label="Email" required sx={{ marginTop: 1 + "rem" }} />
                                <ValidationErrorMessage message={errors.njEmail} touched={touched.njEmail} />
                            </div>
                            <div className="createprofileforminput">
                                <TextField variant='outlined' name='njDesignation' value={values.njDesignation} onBlur={handleBlur} onChange={handleChange} type='designation' label="Designation" required sx={{ marginTop: 1 + "rem" }} InputProps={{
                                    readOnly: true,
                                }} />
                                <ValidationErrorMessage message={errors.njDesignation} touched={touched.njDesignation} />

                            </div>
                        </div>
                        <div className="profile-row">
                            <div className="createprofileforminput">
                                <TextField variant='outlined' onBlur={handleBlur} onChange={handleChange} name='njPassword' value={values.njPassword} type='password' label="Password" required sx={{ marginTop: 1 + "rem" }} />
                                <ValidationErrorMessage message={errors.njPassword} touched={touched.njPassword} />
                            </div>
                            <div className="createprofileforminput">
                                <TextField variant='outlined' onBlur={handleBlur} onChange={handleChange} name='confirmPassword' type='password' label="ConfirmPassword" required sx={{ marginTop: 1 + "rem" }} />
                            </div>
                        </div>
                        <div className="profile-row">
                            <div className="createprofileforminput" style={{width:100+"%"}}>
                                <TextField variant='outlined' onBlur={handleBlur} onChange={handleChange} rows={3} value={values.njAddress} multiline name='njAddress' type='address' label="Address" required sx={{ marginTop: 1 + "rem", width: 100 + "%" }} />
                                <ValidationErrorMessage message={errors.njAddress} touched={touched.njAddress} />
                            </div>
                        </div>
                        <div className="profile-row">
                            <div className="form-col" style={{ marginTop: 2 + "rem" }}>
                                {!values.njImage && (
                                    <>
                                        {" "}
                                        <label
                                            htmlFor="contained-button-file"
                                            className="file-upload-btn"
                                        >
                                            <input
                                                id="contained-button-file"
                                                type="file"
                                                name="profileImage"
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
                                            message={errors.njImage}
                                            touched={touched.njImage}
                                        />
                                    </>
                                )}
                                {values.njImage && (
                                    <div className="uploaded-file-name">
                                        <em>
                                            <img src={values.njImage} className="img-upload" width="10rem" height="10rem" alt="" />
                                        </em>
                                        <Button
                                            style={{ marginLeft: 2 + "rem" }}
                                            variant="contained"
                                            component="span"
                                            color="error"
                                            onClick={() => {
                                                setFieldValue("profileImage", "");
                                            }}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                )}
                            </div>

                        </div>
                        <Button variant="contained" color="success" type="submit">
                            Submit
                        </Button>
                    </form>
                )}

            </Formik>


        </div>

    )
}
