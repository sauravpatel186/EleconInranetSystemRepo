import React from 'react'
import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import newsData from '../../../assets/data/newsData';
import "./NewsCard.css";
export const NewsCard = () => {
  return (
    <div className="news-card-container">
                        <Carousel stopOnHover autoPlay infiniteLoop dynamicHeight showArrows={false} showStatus={false} showThumbs={false} showIndicators={false} interval={5000}>

                            {newsData.map((e) => {

                                return (
                                    <div key={e.id} className='news-card'>
                                    <div className="news-card-title">
                                            <Typography variant='body1' sx={{textAlign:"justify !important"}}>{e.startDate}</Typography>
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
                    </div>
  )
}
