import React from 'react'
import "./Sidebar.css"
import { useState,useEffect } from 'react';
import  {Link, NavLink, Nav}  from 'react-router-dom';
import {Close as CloseIcon,
        Badge as BadgeIcon,
        Poll as PollIcon,
        Event as EventIcon,
        Diversity3 as Diversity3Icon,
        Note as NoteIcon,
        TipsAndUpdates as TipsAndUpdatesIcon,
        Article as ArticleIcon,
        Person,
        GridView as Grid
        } from '@mui/icons-material'
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

export const Sidebar = () => {

const sideMenu = document.getElementsByClassName("sidebar-container");
const sidebarClose = ()=>{
    sideMenu[0].style.display = "none";
}
return (
    <div className='sidebar-container'>
        <div className='top-sidebar'>
            <div className='logo-top-sidebar'>
            <Link  to="/" > <img src='Elecon_engineering_logo.png'></img></Link>
            </div>
            <div className='close-top-sidebar' onClick= {sidebarClose}>
                <span><CloseIcon/></span>    
            </div>
        </div>
        <div className='nav-sidebar'>
            <div className='nav-link'>
                <NavLink className="nav-text" to="/" exact>
                    <span><Grid/></span>
                    <label 
                        className='nav-font' 
                        variant='subtitle1'>
                        Dashboard
                    </label>
                </NavLink>
            </div>
            <div className='nav-link'>
                <NavLink className="nav-text" to="/ceomessage" exact>
                    <span><Person/></span>
                    <Typography 
                        className='nav-font' 
                        variant='subtitle1'>
                        CEO Message
                    </Typography></NavLink>
            </div>
            <div className='nav-link'>
                <NavLink className="nav-text"  to="/policies">
                    <span><ArticleIcon/></span>
                    <Typography 
                        className='nav-font' 
                        variant='subtitle1'>
                        Policies
                    </Typography>
                </NavLink>
            </div>
            <div className='nav-link'>
                <NavLink className="nav-text" exact to="/thoughtoftheday">
                    <span><TipsAndUpdatesIcon/></span>
                    <Typography 
                        className='nav-font' 
                        variant='subtitle1'>
                        Thought of the day
                    </Typography>
                </NavLink>
            </div>
            <div className='nav-link'>
                <NavLink className="nav-text" exact to="/noticeboard" >
                    <span><NoteIcon/></span>
                    <Typography 
                        className='nav-font' 
                        variant='subtitle1'>
                        Noticeboard
                    </Typography>
                </NavLink>
            </div>
            <div className='nav-link'>
                <NavLink className="nav-text" exact to="/managementdesk" >
                    <span><Diversity3Icon/></span>
                    <Typography 
                        className='nav-font' 
                        variant='subtitle1'>
                        Management Desk
                    </Typography>
                </NavLink>
            </div>
            <div className='nav-link'>
                <NavLink className="nav-text" exact to="/opinionpoll" >
                    <span><PollIcon/></span>
                    <Typography 
                        className='nav-font' 
                        variant='subtitle1'>
                        Opinion Poll
                    </Typography>
                </NavLink>
            </div>
            <div className='nav-link'>
                <NavLink className="nav-text" exact to="/upcomingevent" >
                    <span><EventIcon/></span>
                    <Typography 
                        className='nav-font' 
                        variant='subtitle1'>
                        Upcoming Event
                    </Typography>
                </NavLink>
            </div>
            <div className='nav-link'>
                <NavLink className="nav-text" exact to="/newjoinee" >
                    <span><BadgeIcon/></span>
                    <Typography 
                        className='nav-font' 
                        variant='subtitle1'>
                        New Joinee
                    </Typography>
                </NavLink>
            </div>
            <div className='nav-link'>
                <NavLink className="nav-text" exact to="/employeemaster" >
                    <span><Person/></span>
                    <Typography 
                        className='nav-font' 
                        variant='subtitle1'>
                        Employee Master
                        </Typography>
                </NavLink>
            </div>
            
        </div>
    </div>
)
}
