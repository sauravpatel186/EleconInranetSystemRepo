import React from 'react'
import "./Sidebar.css"
import { useState, useEffect } from 'react';
import { Link, NavLink, Nav } from 'react-router-dom';
import {
    Close as CloseIcon,
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
    VideoCall,
    Announcement,
    Menu,
    FoodBank,
    FoodBankRounded,
    FoodBankTwoTone,
    FoodBankOutlined,
    SellOutlined,
    Sell,
    FolderShared,
    CheckCircle,
    Collections,
    BurstMode,
    Description,
} from '@mui/icons-material'
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
export const Sidebar = () => {

    const sideMenu = document.getElementsByClassName("sidebar-container");
    const sidebarClose = () => {
        sideMenu[0].style.display = "none";
        sideMenu[0].classList.add("sidebar-container-2");
    }
    let { url, path } = useDispatch();
    console.log(path);
    const [overflow, setOverflow] = useState("hidden");
    return (
        <div className='sidebar-container'>
            <div className='top-sidebar'>
                <div className='logo-top-sidebar'>
                    <Link to="/" > <img src='/Elecon_engineering_logo.png'></img></Link>
                </div>
                <div className='close-top-sidebar' onClick={sidebarClose}>
                    <span><CloseIcon /></span>
                </div>
            </div>
            <div className='nav-sidebar'>
                <div className='nav-link'>
                    <NavLink className="nav-text" to="/admindashboard" exact>
                        <span><Grid /></span>
                        <label className='nav-font'>
                            Dashboard
                        </label>
                    </NavLink>
                </div>
                <div className='nav-link'>
                    <NavLink className="nav-text" to="/admindashboard/ceomessage" exact>
                        <span><Person /></span>
                        <label className='nav-font'>
                            CMD Desk
                        </label></NavLink>
                </div>
                <div className='nav-link'>
                    <NavLink className="nav-text" exact to="/admindashboard/thoughtoftheday">
                        <span><TipsAndUpdatesIcon /></span>
                        <label
                            className='nav-font'
                        >
                            Thought of the day
                        </label>
                    </NavLink>
                </div>
                <div className='nav-link'>
                    <NavLink className="nav-text" exact to="/admindashboard/news" >
                        <span><NoteIcon /></span>
                        <label
                            className='nav-font' >
                            News
                        </label>
                    </NavLink>
                </div>
                <div className='nav-link'>
                    <NavLink className="nav-text" exact to="/admindashboard/managementdesk" >
                        <span><Diversity3Icon /></span>
                        <label
                            className='nav-font'>
                            Management Speaks
                        </label>
                    </NavLink>
                </div>
                <div className='nav-link'>
                    <NavLink className="nav-text" exact to="/admindashboard/opinionpoll" >
                        <span><PollIcon /></span>
                        <label
                            className='nav-font'>
                            Opinion Poll
                        </label>
                    </NavLink>
                </div>
                <div className='nav-link'>
                    <NavLink className="nav-text" exact to="/admindashboard/canteenmenu" >
                        <span><FoodBankOutlined /></span>
                        <label
                            className='nav-font'>
                            Canteen Menu
                        </label>
                    </NavLink>
                </div>
                <div className='nav-link'>
                    <NavLink className="nav-text" exact to="/admindashboard/upcomingevent" >
                        <span><EventIcon /></span>
                        <label
                            className='nav-font'>
                            Upcoming Event
                        </label>
                    </NavLink>
                </div>
                <div className='nav-link'>
                    <NavLink className="nav-text" exact to="/admindashboard/newjoinee" >
                        <span><BadgeIcon /></span>
                        <label
                            className='nav-font' >
                            New Joinee
                        </label>
                    </NavLink>
                </div>
                <div className='nav-link'>
                    <NavLink className="nav-text" exact to="/admindashboard/employeemaster" >
                        <span><Person /></span>
                        <label
                            className='nav-font'>
                            Employee Master
                        </label>
                    </NavLink>
                </div>
                <div className='nav-link'>
                    <NavLink className="nav-text" exact to="/admindashboard/achievement" >
                        <span><EmojiEvents /></span>
                        <label
                            className='nav-font'>
                            Achievement
                        </label>
                    </NavLink>
                </div>
                <div className='nav-link'>
                    <NavLink className="nav-text" exact to="/admindashboard/announcement" >
                        <span><Announcement /></span>
                        <label
                            className='nav-font'>
                            Announcement
                        </label>
                    </NavLink>
                </div>
                <div className='nav-link'>
                    <NavLink className="nav-text" exact to="/admindashboard/salespurchase" >
                        <span><Sell /></span>
                        <label
                            className='nav-font'>
                            Sales/Purchase
                        </label>
                    </NavLink>
                </div>
                <div className='nav-link'>
                    <NavLink className="nav-text" exact to="/admindashboard/approvesalespurchase" >
                        <span><CheckCircle/></span>
                        <label
                            className='nav-font'>
                            Approve Sales/Purchase
                        </label>
                    </NavLink>
                </div>
                <div className='nav-link'>
                    <NavLink className="nav-text" exact to="/admindashboard/employeedirectory" >
                        <span><FolderShared /></span>
                        <label className="nav-font">
                            Employee Directory
                        </label>
                    </NavLink>
                </div>
                <div className='nav-link'>
                    <NavLink className="nav-text" exact to="/admindashboard/employeegallery" >
                        <span><BurstMode /></span>
                        <label className="nav-font">
                            Employee Gallery
                        </label>
                    </NavLink>
                </div>
                <div className='nav-link'>
                    <NavLink className="nav-text" exact to="/admindashboard/approveemployeegallery" >
                        <span><CheckCircle /></span>
                        <label className="nav-font">
                            Approve Employee Gallery
                        </label>
                    </NavLink>
                </div>
                <div className='nav-link'>
                    <NavLink className="nav-text" exact to="/admindashboard/businessgallery" >
                        <span><Collections /></span>
                        <label className="nav-font">
                            Business Gallery
                        </label>
                    </NavLink>
                </div>
                <div className='nav-link'>
                    <NavLink className="nav-text" exact to="/admindashboard/article" >
                        <span><Description /></span>
                        <label className="nav-font">
                            Article
                        </label>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
