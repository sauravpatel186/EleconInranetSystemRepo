import { Typography } from '@mui/material';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import "./EmployeeGalleyCard.css";
export const EmployeeGalleyCard = () => {
    const [show, setshow] = useState(false);
    const [managementdata, setmanagementdata] = useState([]);
    useEffect(() => {
        let data = JSON.parse(localStorage.getItem("employeegallery"));
        if (data != null) {
            const date = todayDate();
            

            let adata = data.filter(management => management.isDeleted == false && convertDate(management.empGalleryEndDate) >= todayDate() && convertDate(management.empGalleryStartDate) <= todayDate() && management.isApproved == true);
            setmanagementdata(adata);
            
            if (adata.length > 0) {
                setshow(true);
                console.log(adata);
            }
        }

    }, [])
    function convertDate(str){
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join("/");
    }
    function todayDate(){
        var date = new Date(),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join("/");
    }
    return (
        <>

            {
                show ? (
                    <div className="emp-gallery-card-container">
                        <Carousel stopOnHover autoPlay infiniteLoop dynamicHeight showArrows={false} showStatus={false} showThumbs={false} showIndicators={false} interval={5000}>

                            {managementdata.map((e) => {

                                return (
                                    <div key={e.id} className='emp-gallery-card'>
                                    <div className="emp-gallery-card-image">
                                        <img src={e.empGalleryImage} alt=""/>
                                    </div>
                                    
                                        {/* <Typography className="legend" variant='body2'> */}
                                        <p className='legend'>{e.empGalleryDescription}</p>
                                        {/* </Typography> */}
                                    
                                    </div>
                                )

                            })}
                        </Carousel>
                    </div>

                ) : (
                    <></>
                )
            }
        </>
    )
}
