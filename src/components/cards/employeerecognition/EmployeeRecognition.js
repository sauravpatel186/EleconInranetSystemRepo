import React from 'react'
import employeeData from '../../../assets/data/employeerecognition'
import { useEffect } from 'react';
import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "./EmployeeRecognition.css";
import { Typography } from '@mui/material';
export const EmployeeRecognition = () => {
    return (

        <div className="employee-recognition-carousel">
            <Carousel stopOnHover autoPlay infiniteLoop axis="vertical" showArrows={false} showStatus={false} showThumbs={false} showIndicators={false} interval={5000}>
                {employeeData.map((e) => {

                    return (
                        <div key={e.id} className='employee-recognition-text-container' style={{borderRadius: 0.5+"rem"}}>
                            <div className='employee-recognition-profile'>
                                <div className='employee-recognition-photo'>
                                    <img src={e.rImage}></img>
                                </div>
                            </div>
                            <div className='employee-recognition-text-description' style={{paddingRight:0.5+"rem"}}>
                                <Typography variant="body1">{e.empName}</Typography>
                                <Typography variant="body1">{e.rTitle}</Typography>
                                <Typography variant="body1">{e.rDescription}</Typography>
                            </div>
                        </div>)

                })}

            </Carousel>

        </div>

    )
}
