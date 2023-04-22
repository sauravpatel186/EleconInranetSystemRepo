import React from 'react'
import { useContext } from 'react'
import UserContext from '../../../context/UserContext'
import { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "./Jobanniversarycard.css";
import { Typography } from '@mui/material'
export const Jobanniversarycard = () => {
    const [userdata, setUserData] = useState([]);
    function convertDate(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [day, mnth].join("/");
    }
    const todayDate = () => {
        var date = new Date(),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [day, mnth].join("/");
    }
    const wholeDate = (str)=>{
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [day, mnth,date.getFullYear()].join("/");
    }
    const subYear = (str)=> {
        let date = wholeDate(str);
        var years = new Date(new Date() - new Date(str)).getFullYear() - 1970;
        
        return [years];
    }
    const [show, setshow] = useState(false);
    useEffect(() => {
        let data = JSON.parse(localStorage.getItem("nj"));
        let date = todayDate();
        let finaldata = data.filter(e => convertDate(e.njDoj).toString() === date);
        if (finaldata != null) {
            setUserData(finaldata);
            setshow(true);
            
        }

    }, [])
    return (
        <>
            {
                show ?
                    <div className='jobcard-container'>
                        <Carousel stopOnHover autoPlay infiniteLoop dynamicHeight showArrows={false} showStatus={false} showThumbs={false} showIndicators={false} interval={5000}>

                            {userdata.map((e) => {
                                return (

                                    <div className='job-card' key={e.id}>
                                        
                                        <div className='job-card-area'>
                                            <Typography variant='body1' sx={{color: "rgb(253, 190, 140) !important",textAlign:"center",height:2+"rem"}} >{e.njFirstName}{" "}{e.njLastName} on completion of {subYear(e.njDoj)} years </Typography>
                                            <div className='job-card-profile'>
                                                <div className='job-card-photo'>
                                                    <img src={e.njImage} height="100%" width="100%" />
                                                </div>
                                            </div>
                                        </div>

                                    </div>)
                            })}


                        </Carousel>
                    </div>
                    :
                    <></>
            }

        </>

    )
}
