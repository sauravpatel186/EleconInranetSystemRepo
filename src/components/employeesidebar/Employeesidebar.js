import React from 'react'
import "./Employeesidebar.css"
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
        VideoCall,
        Announcement,
        Menu,
        FoodBank,
        FoodBankRounded,
        FoodBankTwoTone,
        FoodBankOutlined,
        SellOutlined,
        Sell
        } from '@mui/icons-material'
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
export const Employeesidebar = () => {

const sideMenu = document.getElementsByClassName("sidebar-container");
const sidebarClose = ()=>{
    sideMenu[0].style.display = "none";
    sideMenu[0].classList.add("sidebar-container-2");
}
let {url,path}=useDispatch();
console.log(path);
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
                <NavLink className="nav-text" exact to="/employeedashboard/employeesalespurchase" >
                    <span><Sell/></span>
                    <label 
                        className='nav-font'>
                        Sales/Purchase
                    </label>
                </NavLink>
            </div>
            <div className='nav-link'>
                <NavLink className="nav-text" exact to="/employeedashboard/employeedirectory" >
                    <span><BadgeIcon/></span>
                    <label 
                        className='nav-font'>
                        EmployeeDirectory
                    </label>
                </NavLink>
            </div>
            <div className='nav-link'>
                <NavLink className="nav-text" exact to="/employeedashboard/employeearticle" >
                    <span><ArticleIcon/></span>
                    <label 
                        className='nav-font'>
                        Article
                    </label>
                </NavLink>
            </div>
        </div>
    </div>
)
}
