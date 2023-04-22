import { Typography } from '@mui/material';
import React from 'react'
import { useState, useEffect } from 'react';
import "./Thougthcard.css"

export const Thougthcard = () => {
    const [show, setShow] = useState(false);
    const [thougth, setThougth] = useState();
    const [title, setTitle] = useState();
    const [author, setAuthor] = useState();
    const index = () => {
        var now = new Date();
        var start = new Date(now.getFullYear(), 0, 0);
        var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
        var oneDay = 1000 * 60 * 60 * 24;
        var day = Math.floor(diff / oneDay);
        return day;
    }
    const getData = async () => {
        let data = await JSON.parse(localStorage.getItem("thought"));
        let finaldata = data.filter(e => e.isDeleted == false);
        setThougth(finaldata[index()].Thoughttitle);
        if (thougth.length > 0) {
            let newStr = (thougth) => (thougth.endsWith(".,") ? thougth.substring(0, thougth.length - 1) : thougth).split(".,");
            setTitle(newStr(thougth)[0]);
            let str = (thougth) => (thougth.endsWith(",") ? thougth.substring(0, thougth.length - 1) : thougth).split(",");
            setAuthor(str(newStr(thougth)[1])[0]);
            setShow(true);
        }
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <>{
            show ?
                <div className='thought-card-container'>
                    <div className='thought-card-text'>
                        <Typography variant='body1' sx={{ color: "#8B8B8B !important" }}>"{title}."</Typography>
                    </div>
                    <div className='thought-card-author'>
                        <Typography variant='body1' sx={{ color: "#8B8B8B!important" }}>-{author}</Typography>
                    </div>
                </div>
                :
                <></>
        }

        </>
    )
}
