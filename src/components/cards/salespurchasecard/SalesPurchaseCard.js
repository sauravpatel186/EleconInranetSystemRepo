import React from 'react'
import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "./SalesPurchaseCard.css"
import { Typography } from '@mui/material';

export const SalesPurchaseCard = () => {
    const [show, setShow] = useState(false);
    const [salesData, setSalesData] = useState([]);
    const [userData, setUserData] = useState([]);
    useEffect(() => {
        let data = (JSON.parse(localStorage.getItem("nj")));
        if (data) {
            setUserData(data);
            console.log(data);
        }
    }, [salesData])
    useEffect(() => {
        // let today = todayDate();
        try {
            let data = (JSON.parse(localStorage.getItem("salespurchase"))).filter(s => s.isApproved == true && s.isDeleted == false);
            if (data.length > 0) {
                setSalesData(data);
                setShow(true);
                console.log(data);
            }
        }
        catch (e) {
            console.log(e);
        }
        


    }, [])
    return (
        <>
            {
                show ?
                    <div className='salespurchase-card-container'>
                        <Carousel stopOnHover autoPlay infiniteLoop dynamicHeight showArrows={false} showStatus={false} showThumbs={false} showIndicators={false} interval={2000}>
                            {
                                salesData.map((item, index) => {

                                    return (
                                        <div className="salespurchase-card-content" key={index}>
                                            <div className='salespurchase-card-type'>
                                                <Typography variant="body2" sx={{ textAlign: "center" }}>{item.salespurchaseType}</Typography>
                                            </div>
                                            <div className="salespurchase-card-image">
                                                <img src={item.salespurchaseImage} alt="" width="100%" height="100%"></img>
                                            </div>
                                            <div className="salespurchase-card-title">
                                                <Typography variant='h6'>{item.salespurchaseTitle}</Typography>
                                            </div>
                                            <div className="salespurchase-card-description">
                                                <Typography variant='body2'>{item.salespurchaseDescription}
                                                </Typography>
                                            </div>
                                            <div className="salespurchase-card-name">
                                                <Typography variant='body2'>Name : {userData.filter(u => u.id == item.empid)[0].njFirstName}
                                                </Typography>
                                            </div>
                                            <div className="salespurchase-card-mobile">
                                                <Typography variant='body1'>Mobile No : {item.salespurchaseMNumber}</Typography>
                                            </div>

                                        </div>
                                    )
                                })
                            }

                        </Carousel>
                    </div>
                    : <></>
            }
        </>
    )
}
