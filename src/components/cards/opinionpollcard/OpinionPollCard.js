import { Button, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import React, { useState, useEffect } from 'react'
import "./OpinionPollCard.css";
export const OpinionPollCard = () => {
    const [show, setShow] = useState(false);
    const [pollData, setPollData] = useState([]);

    useEffect(() => {
        let data = (JSON.parse(localStorage.getItem("opinionpoll"))).filter(e => e.isDeleted == false);
        if (data.length > 0) {
            setPollData(data);
            setShow(true);
        }


    }, [])
    return (
        <>
            {
                show ?
                    <div className='opinion-card-container'>
                        {
                            pollData.map((e) => {
                                return (
                                    <div className='opinion-card-content' key={e.id}>
                                        <div className='opinion-card-title'>{e.opinionTitle}</div>
                                        <div className='opinion-card-description'>{e.opinionDescription}</div>
                                        <div className='opinion-card-buttons'>
                                            <FormControl>
                                                <RadioGroup className='radiobtn'>
                                                    {e.opinionType.split("/").map((e) => {
                                                        return (
                                                            <FormControlLabel key={e} value={e} control={<Radio sx={{
                                                                color: "white", '& .MuiSvgIcon-root': {
                                                                    color:"white",
                                                                }
                                                            }} />} label={e} />
                                                        )
                                                    })}
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                        <div className='opinion-card-submit-btn'>
                                            <Button variant='contained' type='submit' sx={{ background: "orange" }}>Submit</Button>
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
