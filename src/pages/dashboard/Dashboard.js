import { Box, Breadcrumbs, Card, Container, Link, Typography, CardContent, TableContainer, Table, TableBody, TableHead, TableRow, TableCell, tableCellClasses } from '@mui/material'
import React from 'react'
import "./Dashboard.css"
import { styled } from '@mui/material/styles';
import { Celebration, Event, Work, Badge } from '@mui/icons-material'
import { useEffect } from 'react';
import { useState } from 'react';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.action.hover,
    // color: "black",
    fontSize: 14,
    fontWeight: 600,
    fontFamily: "Plus Jakarta Sans"
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: 500,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    // backgroundColor: theme.palette.action.hover,
    backgroundColor: "rgba(240, 244, 247,0.5)",
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
export const Dashboard = () => {
  const [birthday, setBirthday] = useState([]);
  const [job, setJob] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [joinee, setJoinee] = useState([]);
  function convertDate(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth].join("/");
  }
  const todayDate = () => {
    var date = new Date(),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth].join("/");
  }
  const getBirthDay = () => {
    let today = todayDate();
    let data = (JSON.parse(localStorage.getItem("nj"))).filter(e => convertDate(e.njDob) == today && e.isDeleted == false);
    if (data.length > 0) {
      setBirthday(data);
    }
  }
  const getJob = () => {
    let today = todayDate();
    let data = (JSON.parse(localStorage.getItem("nj"))).filter(e => convertDate(e.njDoj) == today);
    if (data.length > 0) {
      setJob(data);
    }
  }
  
  const getUpcomingEvent = () => {
    const today = todayDate();
    console.log(today);
    let data = (JSON.parse(localStorage.getItem("event"))).filter(e => e.isDeleted == false && compareStartDate(e.eventStartDate) && compareEndDate(e.eventEndDate));
    console.log(data)
    if (data.length > 0) {
      setEventData(data);
    }
  }
  const getNewJoinee = () => {

    let data = (JSON.parse(localStorage.getItem("nj"))).filter(e => e.isDeleted == false);
    if (data.length > 0) {
      setJoinee(data);
    }
  }
  const compareEndDate = (date1) => {
    var x = new Date(date1);
    var y = new Date();
    if (x >= y) {
        return true;
    }
    return false;
}
const compareStartDate = (date1) => {
    var x = new Date(date1);
    var y = new Date();
    if (x <= y) {
        return true;
    }
    return false;
}
  useEffect(() => {
    getBirthDay();
    getJob();
    getUpcomingEvent();
    getNewJoinee();
  }, [])
  return (
    <div className='page-information-container'>
      <header className="page-header"><label>Dashboard</label></header>
      <div className='page-breadscrumb'>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Link
            underline="hover"
            color="text.primary"
            href="/"
            aria-current="page">
            Dashboard
          </Link>
        </Breadcrumbs>
      </div>
      <div className="dashboard-container">
        <div className='dashboard-container-card'>
          <div className='dashboard-card-1'>
            <div className='dashboard-card-content'>
              <div className='dashboard-card-icon-1'>
                <i className="fas fa-user"><Celebration /></i>
              </div>
              <div className='dashboard-card-text'>
                <Typography variant="h4" component="h2" sx={{ fontWeight: "800 !important" }}>{birthday.length}</Typography>
                <Typography variant="h6" component="h2">Birthday</Typography>
              </div>
            </div>
          </div>
          <div className='dashboard-card-2'>
            <div className='dashboard-card-content'>
              <div className='dashboard-card-icon-2'>
                <i className="fas fa-user"><Work sx={{ color: "white" }} /></i>
              </div>
              <div className='dashboard-card-text'>
                <Typography variant="h4" component="h2" sx={{ fontWeight: "800 !important" }}>{job.length}</Typography>
                <Typography variant="h6" component="h2">Job Anniversary</Typography>
              </div>
            </div>
          </div>
          <div className='dashboard-card-3'>
            <div className='dashboard-card-content'>
              <div className='dashboard-card-icon-3'>
                <i className="fas fa-user"><Event sx={{ color: "white" }} /></i>
              </div>
              <div className='dashboard-card-text'>
                <Typography variant="h4" component="h2" sx={{ fontWeight: "800 !important" }}>{eventData.length}</Typography>
                <Typography variant="h6" component="h2">Upcoming Event</Typography>
              </div>
            </div>
          </div>
          <div className='dashboard-card-4'>
            <div className='dashboard-card-content'>
              <div className='dashboard-card-icon-4'>
                <i className="fas fa-user"><Badge sx={{ color: "white" }} /></i>
              </div>
              <div className='dashboard-card-text'>
                <Typography variant="h4" component="h2" sx={{ fontWeight: "800 !important" }}>{joinee.length}</Typography>
                <Typography variant="h6" component="h2">New Joinee</Typography>
              </div>
            </div>
          </div>
        </div>
        <div className='dashboard-container-table'>
          <div className="dashboard-container-birthday-table">
          <div className="dashboard-container-text-table">
          <Typography variant='h6'>Birthday</Typography>
          </div>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>#</StyledTableCell>
                    <StyledTableCell>Name</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {
                    birthday.map((e) => {
                      return (
                        <StyledTableRow key={e.id} >

                          <StyledTableCell>{birthday.indexOf(birthday.find(achievements => achievements.id == e.id)) + 1}</StyledTableCell>
                          <StyledTableCell>{e.njFirstName} {e.njMiddleName} {e.njLastName}</StyledTableCell>
                        </StyledTableRow>
                      )
                    })
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="dashboard-container-job-table">
          <div className="dashboard-container-text-table">
          <Typography variant='h6'>Job Anniversary</Typography>
          </div>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>#</StyledTableCell>
                    <StyledTableCell>Name</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody sx={{ height: "max-content" }}>
                  {
                    job.map((e) => {
                      return (
                        <StyledTableRow key={e.id} >
                          <StyledTableCell>{job.indexOf(job.find(achievements => achievements.id == e.id)) + 1}</StyledTableCell>
                          <StyledTableCell>{e.njFirstName} {e.njMiddleName} {e.njLastName}</StyledTableCell>
                        </StyledTableRow>
                      )
                    })
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="dashboard-container-event-table">
          <div className="dashboard-container-text-table">
          <Typography variant='h6'>Upcoming Event</Typography>
          </div>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>#</StyledTableCell>
                    <StyledTableCell>Name</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {
                    eventData.map((e) => {
                      return (
                        <StyledTableRow key={e.id} >
                          <StyledTableCell>{eventData.indexOf(eventData.find(achievements => achievements.id == e.id && compareStartDate(achievements.eventStartDate) && compareEndDate(achievements.eventEndDate))) + 1}</StyledTableCell>
                          <StyledTableCell>{e.eventTitle}</StyledTableCell>
                        </StyledTableRow>
                      )
                    }
                    )
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="dashboard-container-joinee-table">
          <div className="dashboard-container-text-table">
          <Typography variant='h6'>New Joinee</Typography>
          </div>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>#</StyledTableCell>
                    <StyledTableCell>Name</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody sx={{ height: "max-content" }}>
                  {
                    joinee.map((e) => {
                      return (
                        <StyledTableRow key={e.id} >
                          <StyledTableCell>{joinee.indexOf(joinee.find(achievements => achievements.id == e.id)) + 1}</StyledTableCell>
                          <StyledTableCell>{e.njFirstName} {e.njMiddleName} {e.njLastName}</StyledTableCell>
                        </StyledTableRow>
                      )
                    })
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
