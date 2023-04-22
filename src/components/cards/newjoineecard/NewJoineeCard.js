import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel'
import { Divider, Typography } from '@mui/material';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import "./NewJoineeCard.css"

export const NewJoineeCard = () => {
    const [show, setshow] = useState(false);
    const [newjoineedata, setnewjoineedata] = useState([]);

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem("nj"));
        if (data != null) {
            if (data.length > 0) {
                let adata = data.filter(e => e.isDeleted == false);
                setnewjoineedata(adata);
                if (adata.length > 0) {
                    setshow(true);
                }

            }
        }
        // console.log(data);

    }, [])

    return (
        <>
            {

                show ? (
                    <div className="newjoinee-carousel">
                        <Carousel stopOnHover autoPlay infiniteLoop axis="vertical" showArrows={false} showStatus={false} showThumbs={false} showIndicators={false} interval={2000}>
                            {/* <marquee direction='bottom'> */}

                            {newjoineedata.map((e) => {

                                return (
                                    <div key={e.id} className='newjoinee-text-container'>
                                        <div className='newjoinee-profile'>
                                            <div className='newjoinee-photo'>
                                                <img src={e.njImage}></img>
                                            </div>
                                        </div>
                                        <div className='newjoinee-text-description'>
                                            <Typography variant="body1" sx={{ color: "#8B8B8B !important" }} >{e.njFirstName} {e.njLastName}</Typography>
                                            <Typography variant="body1" sx={{ color: "#8B8B8B!important" }} >Email : {e.njEmail}</Typography>
                                            <Typography variant="body1" sx={{ color: "#8B8B8B!important" }} >Mobile No: {e.njMobileNo}</Typography>
                                        </div>
                                    </div>)

                            })}
                            {/* </marquee> */}
                        </Carousel>

                    </div>
                ) : (
                    <></>
                )
            }
        </>
    )
}
