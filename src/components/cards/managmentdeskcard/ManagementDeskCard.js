import { Typography } from '@mui/material';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import "./ManagementDeskCard.css";
export const ManagementDeskCard = () => {
    const [show, setshow] = useState(false);
    const [managementdata, setmanagementdata] = useState([]);
    useEffect(() => {
        let data = JSON.parse(localStorage.getItem("md"));
        if (data != null) {
            const date = todayDate();
            console.log(date);

            let adata = data.filter(management => management.isDeleted == false && convertDate(management.mdEndDate) != todayDate() && convertDate(management.mdStartDate) >= todayDate());
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
                    <div className="management-card-container">
                        <Carousel stopOnHover autoPlay infiniteLoop dynamicHeight showArrows={false} showStatus={false} showThumbs={false} showIndicators={false} interval={5000}>

                            {managementdata.map((e) => {

                                return (
                                    <div key={e.id} className='management-card'>
                                        <div className="management-card-title">
                                            <Typography variant='subtitle1' sx={{textAlign:"justify !important",color:"#8B8B8B !important"}}>{e. mdTitle}</Typography>
                                        </div>
                                        <div className="management-card-description">
                                            <Typography variant='subtitle2' sx={{textAlign:"justify !important",color:"#8B8B8B !important"}}>{e.mdDescription}</Typography>
                                        </div>
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
