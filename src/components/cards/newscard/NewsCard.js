import React from 'react'
import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import newsData from '../../../assets/data/newsData';
import "./NewsCard.css";
export const NewsCard = () => {
    const [show, setshow] = useState(false);
    const [newsdata, setnewsdata] = useState([]);

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem("news"));
        if (data != null) {
            if (data.length > 0) {
                let adata = data.filter(e => compareStartDate(e.newsStartDate) && compareEndDate(e.newsEndDate));
                setnewsdata(adata);
                if (adata.length > 0) {
                    setshow(true);
                }

            }
        }
        console.log(newsdata);

    }, [])
    const compareEndDate = (date1) =>{
        var x = new Date(date1);
        var y = new Date();
        if(x >= y)
        {
            return true;
        }
        return false;
    }
    const compareStartDate = (date1) =>{
        var x = new Date(date1);
        var y = new Date();
        if(x <= y)
        {
            return true;
        }
        return false;
    }
    function convertDate(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join("/");
    }
  return (
    <div className="news-card-container">
    {
        show?
                        <Carousel stopOnHover autoPlay infiniteLoop dynamicHeight showArrows={false} showStatus={false} showThumbs={false} showIndicators={false} interval={5000}>

                            {newsdata.map((e) => {

                                return (
                                    <div key={e.id} className='news-card'>
                                    <div className="news-card-title">
                                            <Typography variant='body1' sx={{textAlign:"justify !important"}}>{convertDate(e.newsStartDate)}</Typography>
                                        </div>
                                        <div className="news-card-title">
                                            <Typography variant='body1' sx={{textAlign:"justify !important",color:"#8B8B8B !important"}}>{e.newsTitle}</Typography>
                                        </div>
                                        <div className="news-card-description">
                                            <Typography variant='body2' sx={{textAlign:"justify !important",color:"#8B8B8B !important"}}>{e.newsDescription}</Typography>
                                        </div>
                                    </div>
                                )

                            })}
                        </Carousel>
                        :
                        <></>
    }
                    </div>
  )
}
