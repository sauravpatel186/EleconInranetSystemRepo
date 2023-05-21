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
    const getData = () => {
        setShow(true);
        // let data = (JSON.parse(localStorage.getItem("thought"))).filter(e=>e.isDeleted == false);
        // let i = index();
        // console.log(index());
        // setThougth(data[140].Thoughttitle);
        // if (thougth != null) {   
        //     let newStr =  (thougth) => (thougth.endsWith(".,") ? thougth.substring(0, thougth.length - 1) : thougth).split(".,");
        //     setTitle(newStr(thougth)[0]);
        //     let str =  (thougth) =>  (thougth.endsWith(",") ? thougth.substring(0, thougth.length - 1) : thougth).split(",");
        //     setAuthor(str(newStr(thougth)[1])[0]);
        //     setShow(true);
        // }
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <>{
            show ?
                <div className='thought-card-container'>
                

                    <div className='thought-card-text' style={{marginTop:1.6+"rem"}}>
                        <Typography variant='body1' sx={{ color: "#8B8B8B !important" }}>If you have the opportunity to play this game of life you need to appreciate every moment. a lot of people don't appreciate the moment until it's passed</Typography>
                    </div>
                    <div className='thought-card-author'>
                        <Typography variant='body1' sx={{ color: "#8B8B8B!important" }}>-Kanye West</Typography>
                    </div>
                
                </div>
                
                :
                <></>
        }

        </>
    )
}
