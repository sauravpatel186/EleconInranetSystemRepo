import { Typography } from '@mui/material';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Carousel } from 'react-responsive-carousel';
import "./ArticleCard.css";
export const ArticleCard = () => {
    const [articleData, setArticleData] = useState([]);
    const [show, setShow] = useState(false);
    useEffect(() => {
        let data = (JSON.parse(localStorage.getItem("article"))).filter(a => a.isDeleted == false);
        if (data.length > 0) {
            setArticleData(data);
            setShow(true);
            console.log(data);
        }
    }, [])
    return (
        <>
            {
                show ?
                    <div className='article-card-container'>

                        {
                            articleData.map((m) => {
                                return (
                                    <div className='article-card-content'>
                                        <div className='article-card-title'>
                                            <Typography variant='body1'>{m.articleTitle}</Typography>
                                        </div>
                                        <div className='article-card-link'>
                                            <Typography variant='body1'><a href={m.articleLink} target="_blank">Link of Article</a></Typography>
                                        </div>
                                        <div className='article-card-description'>
                                            <Typography variant='body1'>{m.articleDescription}</Typography>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                    :
                    <></>
            }
        </>
    )
}
