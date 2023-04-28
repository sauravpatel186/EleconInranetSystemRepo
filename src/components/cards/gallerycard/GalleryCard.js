import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "./GalleryCard.css"
import elecon from "../../../assets/images/Elecon_engineering_logo.png"
import infra from "../../../assets/images/infrastructure-img1.jpg"
import madhuban from "../../../assets/images/madhubhan_resort_spa.jpg"
export const GalleryCard = () => {
    return (
        <>

            
                    <div className="achievement-card-container">            
                    <Carousel stopOnHover autoPlay infiniteLoop dynamicHeight showArrows={false} showStatus={false} showThumbs={false} showIndicators={false} interval={2000}>
                        <img src={infra} width="100%" height="100%"/>
                        {/* <img src={elecon} width="100%" height="100%"/> */}
                        <img src={madhuban} width="100%" height="100%"/>
                    </Carousel>
                    </div>
        </>
    )
}
