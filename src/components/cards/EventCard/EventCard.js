import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel'
import { Divider, Typography } from '@mui/material';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import elecon from "../../assets/images/Elecon_engineering_logo.png"
// import infra from "../../assets/images/infrastructure-img1.jpg"
import "./EventCard.css"
import dayjs from 'dayjs';
export const EventCard = () => {
    const [show, setshow] = useState(false);
    const [eventdata,seteventdata] = useState([]);
    const todayDate = (("0" + new Date().getDate()).slice(-2)+"/" +("0" + (new Date().getMonth() + 1)).slice(-2)+"/"+new Date().getFullYear()).toString();
    useEffect(()=>{
        let data = JSON.parse(localStorage.getItem("event"));
        if(data != null) {
            if(data.length > 0)
            {
                let adata = data.filter(e=>e.isDeleted == false);
                let finaldata = adata.filter(e=>convertDate(e.eventEndDate).toString() !== todayDate); 
                console.log(data)
                console.log(adata)  
                seteventdata(finaldata);
                if(finaldata.length > 0)
                {
                    setshow(true);
                }
                
            }
        }
        // console.log(data);
        

    },[])
    function convert(str) {
        var date = new Date(str),
          day = ("0" + date.getDate()).slice(-2);
        return [day];
      }
    function convertDate(str){
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join("/");
    }
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sepr", "Oct", "Nov", "Dec"
];

      function tomonth(str){
        var date = new Date(str),
        mnth = date.getMonth() + 1;
        return [monthNames[mnth-1]];
      }
    return (
        <>
            {
                
                show ? (
                    <div className="event-carousel">
                    <Carousel stopOnHover autoPlay infiniteLoop axis="vertical" showArrows={false} showStatus={false} showThumbs={false} showIndicators={false} interval={1000}>
                   {/* <marquee direction='bottom'> */}
                   
                        {eventdata.slice(0,4).map((e) => {
                            
                            return (<div key={e.id} className='event-text-container'>
                            
                                <div className='event-date'>
                                <Typography variant="h4" sx={{color:"#2B50AA",fontWeight:600}}>{convert(e.eventEndDate)}</Typography>
                                <div className='event-date-month'>
                                <Typography variant="subtitle1" sx={{color:"white !important",opacity:"0.8"}}>{tomonth(e.eventEndDate)}</Typography>
                                </div>
                                </div>
                                <Divider orientation='vertical'/>
                                <Typography variant="body1" sx={{color:"#8B8B8B !important"}} className='event-text-description'>{e.eventDescription}</Typography>
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
