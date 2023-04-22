import React from 'react'
import "./Announcementcard.css"
import { Carousel } from 'react-responsive-carousel'
import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
export const Announcementcard = () => {
    const [announcement, setAnnouncement] = useState([]);
    const [show, setShow] = useState(false);
    useEffect(() => {
        let data = JSON.parse(localStorage.getItem("announcement"));
        let date = todayDate();
        
        let finaldata = data.filter(e => e.isDeleted == false && convertDate(e.announcementEndDate) >= todayDate() && convertDate(e.announcementStartDate) <= todayDate());
        if (finaldata != null) {
            setAnnouncement(finaldata);
            setShow(true);
        }
    }, [])
    function convertDate(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join("/");
    }
    function todayDate() {
        var date = new Date(),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join("/");
    }
    return (
        <>
            <div className="announcementcard-container">
                {show ?
                    <Carousel stopOnHover autoPlay infiniteLoop dynamicHeight showArrows={false} showStatus={false} showThumbs={false} showIndicators={false} interval={10000}>
                        {
                            announcement.map((e) => {
                                return (
                                    <div className="announcementcard-text" key={e.id}>
                                        <div className="announcementcard-date"><Typography variant='subtitle2'>{convertDate(e.announcementStartDate)}</Typography></div>
                                        <div className="announcementcard-title"><Typography variant='body1' sx={{color:"#8B8B8B !important",marginTop:0.5+"rem"}}>{e.announcementTitle}</Typography></div>
                                        <div className="announcementcard-description"><Typography variant='body1' sx={{color:"#8B8B8B !important"}}>{e.announcementDescription}</Typography></div>

                                    </div>
                                )
                            })
                        }
                    </Carousel>
                    :
                    <></>
                }
            </div>
        </>
    )
}
