import { Divider, Typography } from '@mui/material';
import React from 'react'
import { useEffect, useState } from 'react';
import "./CanteenMenuCard.css"
export const CanteenMenuCard = () => {
    const [canteen, setCanteen] = useState([]);
    const [show, setShow] = useState(false);
    useEffect(() => {

        let data = JSON.parse(localStorage.getItem("canteenmenu"));

        let finaldata = data.filter(e => e.isDeleted == false);
        if (finaldata != null) {
            setCanteen(finaldata);
            setShow(true);
        }
    }, [])

    return (
        <>
            <div className="canteenmenucard-container">
                {show ?

                    canteen.map((e) => {
                        return (
                            <div className="canteenmenucard-text" key={e.id}>

                                <Typography variant="body1" sx={{ fontWeight: "bold !important",fontSize:16+"px !important",color:"#8B8B8B !important"}}>
                                    Breakfast
                                </Typography>
                                <div className="canteenmenucard-breakfast">
                                    <ul className='' >{(e.newmenuBreakfastFood).split(",").map((x) => {
                                        return <li key={x}> <Typography variant="body2" sx={{color:"#8B8B8B !important"}}>{x} </Typography></li>
                                    })}
                                    </ul>
                                </div>
                                <Divider orientation='horizontal'/>
                                <Typography variant="body1" sx={{ fontWeight: "bold !important",fontSize:16+"px !important",color:"#8B8B8B !important"}}>
                                    Lunch
                                </Typography>
                                <div className="canteenmenucard-lunch">
                                    <ul>{(e.newmenuLunchFood).split(",").map((x) => {
                                        return <li key={x}><Typography variant="body2" sx={{color:"#8B8B8B !important"}}>{x}</Typography></li>
                                    })}
                                    </ul>

                                </div>
                            </div>
                        )
                    })
                    :
                    <></>}
            </div>
        </>
    )
}
