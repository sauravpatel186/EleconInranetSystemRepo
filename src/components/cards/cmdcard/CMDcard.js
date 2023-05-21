import React, { useEffect } from 'react'
import { useState } from 'react'
import "./CMDcard.css"
import mdphoto from "../../../assets/images/cmd.jpg"
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'
export const CMDcard = () => {
  const [cmdmsg, setcmdmsg] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const getCMDMessage = () => {
    let data = (JSON.parse(localStorage.getItem("ceomessage")))[0].ceomessageDescription;
    if (data) {
      setcmdmsg(data);
    }
  }
  useEffect(() => {
    try {
      getCMDMessage();
    }
    catch (e) {

    }
  }, [])
  return (
    <>
      <div className="cmd-card">
        <div className="cmd-profile">
          <div className="cmd-photo">
            <img src={mdphoto} alt='CMD' onClick={handleClickOpen} />
            <Dialog open={open} onClose={handleClose} sx={{ zIndex: 5000 }}>
              <DialogActions>
                <Close onClick={handleClose} autoFocus />
              </DialogActions>
              <DialogTitle>CMD Message</DialogTitle>

              <DialogContent>
                <div className='md-description'>
                  <div className='md-image'>
                    <img src={mdphoto} alt='CMD' height="100%" width="100%" />
                    <Typography variant='h6'>SHRI PRAYASVIN B. PATEL</Typography>
                    <Typography variant='body1' sx={{textAlign:'center'}}>Chairman & Managing Director</Typography>
                  </div>
                  <div className='md-msg'>
                  <DialogContentText id="alert-dialog-description" sx={{ marginTop: 1 + "rem" }}>
                    {cmdmsg != null ? cmdmsg : <></>}
                  </DialogContentText>
                  </div>
                </div>
              </DialogContent>

            </Dialog>
          </div>
        </div>
      </div>
    </>
  )
}
