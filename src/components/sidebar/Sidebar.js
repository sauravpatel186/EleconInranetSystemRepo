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
import displayReducer, { displayActions } from '../../state/reducers/displayReducer';
import store from '../../state/store';
export const Sidebar = () => {
    const display = useSelector(state => state.showIcon);
    const dispatch = useDispatch();
    var style = "block";
    if(!display)
    {
        style = "none";
    }
    const handleClick=()=>{
        console.log("button clicked");
        store.dispatch({showIcon : false })
    }
    const activeLink = "display : flex , color:#527ed4 ,background : #, margin-left: 2rem, gap: 1rem , align-items: center,position: relative , height: 3.7rem , transition: all 300ms ease";
    const normalLink = "display-flex  color-#c0d0ef margin-left - 2rem, gap: 1rem , align-items: center,position: relative , height: 3.7rem , transition: all 300ms ease";
return (
    <div className='sidebar-container' style={{display : `${style}`}}>
        <div className='top-sidebar'>
            <div className='logo-top-sidebar'>
            <NavLink  to="/" > <img src='Elecon_engineering_logo.png'></img></NavLink>
            </div>
            <div className='close-top-sidebar' onClick={handleClick}>
                <span><CloseIcon/></span>    
            </div>
        </div>
        <div className='nav-sidebar'>
            <div className='nav-link'>
                <NavLink className="nav-text" exact activeClassName='active-nav-text' to="/" >
                    <span><Grid/></span>
                    <Typography 
                        className='nav-font' 
                        variant='subtitle1'>
                        Dashboard
                    </Typography>
                </NavLink>
            </div>
            <div className='nav-link'>
                <Link className="nav-text" exact activeClassName='active-nav-text' to="/ceomessage">
                    <span><Person/></span>
                    <Typography 
                        className='nav-font' 
                        variant='subtitle1'>
                        CEO Message
                    </Typography></Link>
            </div>
            <div className='nav-link'>
                <NavLink className="nav-text" exact activeClassName='active-nav-text' to="/policies">
                    <span><ArticleIcon/></span>
                    <Typography 
                        className='nav-font' 
                        variant='subtitle1'>
                        Policies
                    </Typography>
                </NavLink>
            </div>
            <div className='nav-link'>
                <NavLink className="nav-text" exact to="/thoughtoftheday" activeClassName='active-nav-text'>
                    <span><TipsAndUpdatesIcon/></span>
                    <Typography 
                        className='nav-font' 
                        variant='subtitle1'>
                        Thought of the day
                    </Typography>
                </NavLink>
            </div>
            <div className='nav-link'>
                <NavLink className="nav-text" exact to="/noticeboard" activeClassName='active-nav-text'>
                    <span><NoteIcon/></span>
                    <Typography 
                        className='nav-font' 
                        variant='subtitle1'>
                        Noticeboard
                    </Typography>
                </NavLink>
            </div>
            <div className='nav-link'>
                <NavLink className="nav-text" exact to="/managementdesk" activeClassName='active-nav-text'>
                    <span><Diversity3Icon/></span>
                    <Typography 
                        className='nav-font' 
                        variant='subtitle1'>
                        Management Desk
                    </Typography>
                </NavLink>
            </div>
            <div className='nav-link'>
                <NavLink className="nav-text" exact to="/opinionpoll" activeClassName='active-nav-text'>
                    <span><PollIcon/></span>
                    <Typography 
                        className='nav-font' 
                        variant='subtitle1'>
                        Opinion Poll
                    </Typography>
                </NavLink>
            </div>
            <div className='nav-link'>
                <NavLink className="nav-text" exact to="/upcomingevent" activeClassName='active-nav-text'>
                    <span><EventIcon/></span>
                    <Typography 
                        className='nav-font' 
                        variant='subtitle1'>
                        Upcoming Event
                    </Typography>
                </NavLink>
            </div>
            <div className='nav-link'>
                <NavLink className="nav-text" exact to="/newjoinee" activeClassName='active-nav-text'>
                    <span><BadgeIcon/></span>
                    <Typography 
                        className='nav-font' 
                        variant='subtitle1'>
                        New Joinee
                    </Typography>
                </NavLink>
            </div>
            <div className='nav-link'>
                <NavLink className="nav-text" exact to="/employeemaster" activeClassName='active-nav-text'>
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
