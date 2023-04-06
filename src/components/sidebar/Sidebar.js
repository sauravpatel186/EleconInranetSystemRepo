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
        GridView as Grid,
        EmojiEvents,
        VideoCall
        } from '@mui/icons-material'
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';


export const Sidebar = () => {

const sideMenu = document.getElementsByClassName("sidebar-container");
const sidebarClose = ()=>{
    sideMenu[0].style.display = "none";
    sideMenu[0].classList.add("sidebar-container-2");
}
const [overflow,setOverflow]=useState("hidden");
return (
    <div className='sidebar-container'>
        <div className='top-sidebar'>
            <div className='logo-top-sidebar'>
            <Link  to="/" > <img src='/Elecon_engineering_logo.png'></img></Link>
            </div>
            <div className='close-top-sidebar' onClick= {sidebarClose}>
                <span><CloseIcon/></span>    
            </div>
        </div>
        <div className='nav-sidebar'>
            <div className='nav-link'>
                <NavLink className="nav-text" to="/" exact>
                    <span><Grid/></span>
                    <label className='nav-font'>
                        Dashboard
                    </label>
                </NavLink>
            </div>
            <div className='nav-link'>
                <NavLink className="nav-text" to="/ceomessage" exact>
                    <span><Person/></span>
                    <label className='nav-font'>
                        CEO Message
                    </label></NavLink>
            </div>
            <div className='nav-link'>
                <NavLink className="nav-text"  to="/policies">
                    <span><ArticleIcon/></span>
                    <label className='nav-font'>
                        Policies
                    </label>
                </NavLink>
            </div>
            <div className='nav-link'>
                <NavLink className="nav-text" exact to="/thoughtoftheday">
                    <span><TipsAndUpdatesIcon/></span>
                    <label
                        className='nav-font' 
                        >
                        Thought of the day
                    </label>
                </NavLink>
            </div>
            <div className='nav-link'>
                <NavLink className="nav-text" exact to="/noticeboard" >
                    <span><NoteIcon/></span>
                    <label 
                        className='nav-font' >
                        Noticeboard
                    </label>
                </NavLink>
            </div>
            <div className='nav-link'>
                <NavLink className="nav-text" exact to="/managementdesk" >
                    <span><Diversity3Icon/></span>
                    <label 
                        className='nav-font'>
                        Management Desk
                    </label>
                </NavLink>
            </div>
            <div className='nav-link'>
                <NavLink className="nav-text" exact to="/opinionpoll" >
                    <span><PollIcon/></span>
                    <label 
                        className='nav-font'>
                        Opinion Poll
                    </label>
                </NavLink>
            </div>
            <div className='nav-link'>
                <NavLink className="nav-text" exact to="/upcomingevent" >
                    <span><EventIcon/></span>
                    <label
                        className='nav-font'>
                        Upcoming Event
                    </label>
                </NavLink>
            </div>
            <div className='nav-link'>
                <NavLink className="nav-text" exact to="/newjoinee" >
                    <span><BadgeIcon/></span>
                    <label
                        className='nav-font' >
                        New Joinee
                    </label>
                </NavLink>
            </div>
            <div className='nav-link'>
                <NavLink className="nav-text" exact to="/employeemaster" >
                    <span><Person/></span>
                    <label 
                        className='nav-font'>
                        Employee Master
                        </label>
                </NavLink>
            </div>
            <div className='nav-link'>
                <NavLink className="nav-text" exact to="/achievement" >
                    <span><EmojiEvents/></span>
                    <label 
                        className='nav-font'>
                        Achievement
                        </label>
                </NavLink>
            </div>
            <div className='nav-link'>
                <NavLink className="nav-text" exact to="/videostreaming" >
                    <span><VideoCall/></span>
                    <label 
                        className='nav-font'>
                        Video Streaming
                        </label>
                </NavLink>
            </div>
            <div className='nav-link'>
                <NavLink className="nav-text" exact to="/videostreaming" >
                    <span><VideoCall/></span>
                    <label 
                        className='nav-font'>
                        Video Streaming
                        </label>
                </NavLink>
            </div>
          
        </div>
    </div>
)
}
