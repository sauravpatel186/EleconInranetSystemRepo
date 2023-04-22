import React from 'react'
import { useContext } from 'react'
import UserContext from '../../../context/UserContext'
import { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "./BirthdayCard.css";
import { Typography } from '@mui/material'
export const BirthdayCard = () => {
    const [userBirthDay, setUserBirthday] = useState([]);
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
    const [show, setshow] = useState(false);
    useEffect(() => {
        let data = JSON.parse(localStorage.getItem("nj"));
        let date = todayDate();
        let finaldata = data.filter(e => convertDate(e.njDob).toString() === date);
        if (finaldata != null) {
            setUserBirthday(finaldata);
            setshow(true);
        }

    }, [])
    return (
        <>
            {
                show ?
                    <div className='birthdaycard-container'>
                        <Carousel stopOnHover autoPlay infiniteLoop dynamicHeight showArrows={false} showStatus={false} showThumbs={false} showIndicators={false} interval={5000}>

                            {userBirthDay.map((e) => {
                                return (

                                    <div className='birthday-card' key={e.id}>
                                        
                                        <div className='birthday-card-area'>
                                            <Typography variant='body1' sx={{color: "#ff858D !important"}}>{e.njFirstName}{" "}{e.njLastName}</Typography>
                                            <div className='birthday-card-profile'>
                                                <div className='birthday-card-photo'>
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
