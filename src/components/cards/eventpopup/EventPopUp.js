import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@mui/material'
import { Close } from '@mui/icons-material'
export const EventPopUp = (props) => {
    const [eventData, setEventData] = useState([]);
    const getEventData = () => {
        let data = (JSON.parse(localStorage.getItem("event"))).filter(event => event.id == props.id);
    }
    const [open, setOpen] = React.useState(true);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        try {
            getEventData();
            console.log("hello");
        }
        catch (e) {

        }
    }, [])
    return (
        <Dialog open={open} onClose={handleClose} sx={{ zIndex: 5000 }}>
            <DialogActions>
                <Close onClick={handleClose} autoFocus />
            </DialogActions>
            <DialogTitle>Event Detail</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                {eventData}
                </DialogContentText>
            </DialogContent>

        </Dialog>
    )
}
