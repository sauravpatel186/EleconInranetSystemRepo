import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "./achievement.css"
import elecon from "../../assets/images/Elecon_engineering_logo.png"
import infra from "../../assets/images/infrastructure-img1.jpg"
export const Achievementcard = () => {
    const [achievementdata, setachievementdata] = useState([]);
    useEffect(() => {
        let data = JSON.parse(localStorage.getItem("achievement"));
        setachievementdata(data);
    }, [])

    return (
        <>
    
        {
            achievementdata.length > 0 ? (
            <Carousel stopOnHover autoPlay infiniteLoop dynamicHeight showArrows={false} showStatus={false} showThumbs={false} showIndicators={false} interval={20000}>
                <img src={elecon} width="100%" height="100%"></img>
                <img src={infra} width="100%" height="100%"></img>
                {achievementdata.map((e) => {
                    return (<div key={e.id}>
                        <img src={e.achievementImage} width="100%" height="100%"></img>
                        <p className='legend'>{e.achievementTitle}</p>
                    </div>)
                })}
            </Carousel>
            ) : (
                <></>
            )
        }
        </>
    )
}
