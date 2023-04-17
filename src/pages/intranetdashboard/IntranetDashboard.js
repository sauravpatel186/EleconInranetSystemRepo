import { Menu, MenuItem, Typography } from '@mui/material'
import React, { useEffect} from 'react'
import { Close, Menu as MenuIcon } from '@mui/icons-material'
import { useState } from 'react'
import "./IntranetDashboard.css"
import tree from "../../assets/images/icons8-resort-64.png"
import cricket from "../../assets/images/cricket-image.png"
import tennis from "../../assets/images/tennis-img.png"
import { Link, NavLink } from "react-router-dom"
import { Achievementcard } from "../../components/cards/achievementcard"
import {EventCard} from "../../components/cards/EventCard/EventCard"
export const IntranetDashboard = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const menu = document.getElementById("menu-btn");
    const closebtn = document.getElementById("close-btn");

    const openSidebar = () => {

        menu.style.display = "none";
        closebtn.style.display = "flex";
    }
    const closeSidebar = () => {
        menu.style.display = "flex";
        closebtn.style.display = "none";
    }

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    
    const [showTime,setShowTime] = useState("");
    const [merediem,setMerediem] = useState();
    useEffect(() => {
        const date = new Date();
        setShowTime(date.getHours().toString());
        setMerediem((date.toLocaleTimeString()).slice(-2));
    })
    
    return (
        <div className='main-intranet-dashboard'>
            <div className='topbar-dashboard'>
                <button id='menu-btn' name='hambutton' onClick={toggleMenu}>
                    <span> {isOpen ? <Close /> : <MenuIcon />}</span>
                </button>
                <div className='elecon-logo'>
                    <Link to="/" > <img src='/Elecon_engineering_logo.png'></img></Link>
                </div>
                <div className={`navigation-topbar ${isOpen ? 'show-menu' : ''}`} >
                    <div className='nav-link'>
                        <NavLink className="nav-text" exact to="/employeemaster" >
                            <label
                                className='nav-font'>
                                Payroll
                            </label>
                        </NavLink>
                    </div>
                    <div className='nav-link'>
                        <NavLink className="nav-text" exact to="/intranet/admin/achievement" >

                            <label
                                className='nav-font'>
                                Company Policy
                            </label>
                        </NavLink>
                    </div>
                    <div className='nav-link'>
                        <NavLink className="nav-text" exact to="/videostreaming" >

                            <label
                                className='nav-font'>
                                Madubhan
                            </label>
                        </NavLink>
                    </div>
                    <div className='nav-link'>
                        <NavLink className="nav-text" exact to="/videostreaming" >

                            <label
                                className='nav-font'>
                                Holiday
                            </label>
                        </NavLink>
                    </div>
                    <div className='nav-link'>
                        <NavLink className="nav-text" exact to="/videostreaming" >
                            <label
                                className='nav-font'>
                                Horoscope
                            </label>
                        </NavLink>
                    </div>
                    <div className='nav-link'>
                        <NavLink className="nav-text" exact to="/videostreaming" >
                            <label
                                className='nav-font'>
                                Health
                            </label>
                        </NavLink>
                    </div>
                    <div className='nav-link'>
                        <NavLink className="nav-text" exact to="/videostreaming" >
                            <label
                                className='nav-font'>
                                Information
                            </label>
                        </NavLink>
                    </div>
                    <div className='nav-link'>
                        <NavLink className="nav-text" exact to="/videostreaming" >
                            <label
                                className='nav-font'>
                                Services
                            </label>
                        </NavLink>
                    </div>
                </div>
                <div className='profile-area'>
                    <div className='profile'>
                        <div className='profile-photo'>
                            <img className="profile-image" src="/profile-1.jpg" onClick={handleClick} />
                        </div>
                    </div>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        style={{zIndex:3000}}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}><Link to="/admindashboard" onClick={() => props.open(true)}>Admin Dashboard</Link></MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </div>


                {/* <button id="close-btn" onClick={closeSidebar}>
                    <span><Close/></span>
                </button> */}
            </div>

            <div className='intranet-container'>
                <div className='container-content'>
                    <div className='welcome-text'>
                        <Typography variant='h4' className='welcome-text-1'>Welcome,</Typography>
                        <Typography variant='h4' className='welcome-text-2'>{(()=>{
                            if(showTime <= "12" && merediem == "am"){
                                return (
                                    <span>Good Morning</span>
                                )
                                
                            }
                            else if(showTime <= "6" && merediem == "pm"){
                                return (
                                    <span>Good Afternoon</span>
                                )
                            }
                            else if(showTime>"6" && showTime <= "12" && merediem == "pm"){
                                return (
                                    <span>Good Evening</span>
                                )
                            }
                            else{
                            
                                return (
                                    <span>Good Night</span>
                        
                                )
                                }
                        })()} It's {(new Date().getHours())+":"+new Date().getMinutes()}</Typography>
                    </div>
                </div>
                <div className='container-content-row-2'>
                    <div className='gallery-container'>
                        <div className='gallery-text'><Typography variant='body1'>Gallery</Typography></div>
                        <div className='gallery-box'>
                            {/* <Achievementcard /> */}
                            {
                                /* <img src="/infrastructure-img1.jpg"></img> */}
                        </div>
                    </div>
                    <div className='event-container'>
                        <div className='event-text'><Typography variant='body1'>Upcoming Event</Typography></div>
                        <div className='event-box'>
                            <EventCard />
                        </div>
                    </div>
                    <div className='thought-birthday-container'>
                        <div className='thought-container'>
                            <div className='thought-text'><Typography variant='body1'>Thougth of the day</Typography></div>
                            <div className='thought-box'></div>
                        </div>
                        <div className='birthday-container'>
                            <div className='birthday-text'><Typography variant='body1'>Birthday</Typography></div>
                            <div className='birthday-box'></div>
                        </div>
                    </div>
                </div>
                <div className='container-content-row-3'>
                    <div className='announcement-container'>
                        <div className='announcement-text'><Typography variant='body1'>Announcement</Typography></div>
                        <div className='announcement-box'></div>
                    </div>
                    <div className='news-container'>
                        <div className='news-text'><Typography variant='body1'>Latest News</Typography></div>
                        <div className='news-box'></div>
                    </div>
                    <div className='anniversary-container'>
                        <div className='anniversary-text'><Typography variant='body1'>Job Anniversary</Typography></div>

                        <div className='anniversary-box'>
                            <div className='anniversary-subtext'><p style={{ color: "#fdbe8c" }}>Congratulations</p></div>
                        </div>
                    </div>
                </div>
                <div className='container-content-row-4'>
                    <div className='canteen-container'>
                        <div className='canteen-text'><Typography variant='body1'>Canteen Menu</Typography></div>
                        <div className='canteen-box'></div>
                    </div>
                    <div className='sales-container'>
                        <div className='sales-text'><Typography variant='body1'>Sales/Purchase</Typography></div>
                        <div className='sales-box'></div>
                    </div>
                    <div className='container-content-sub-row-4'>
                        <div className='management-container'>
                            <div className='management-text'><Typography variant='body1'>Managment Speaks</Typography></div>
                            <div className='management-box'></div>
                        </div>
                        <div className='opinion-cmd-container'>
                            <div className='opinion-container'>
                                <div className='opinion-box'>
                                    <div className='opinion-text'><Typography variant='body1'>Opinion Poll</Typography></div>

                                </div>
                            </div>
                            <div className='cmd-container'>
                                <div className='cmd-box'>
                                    <div className='cmd-text'><Typography variant='body1'>CMD Desk</Typography></div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container-content-row-5'>
                    <div className='employee-recognition-container'>
                        <div className='employee-recognition-text'>
                            <Typography variant='body1'>Employee Recognition</Typography>
                        </div>
                        <div className='employee-recognition-box'>

                        </div>
                    </div>
                    <div className='employee-gallery-container'>
                        <div className='employee-gallery-text'>
                            <Typography variant='body1'>Employee Gallery</Typography>
                        </div>
                        <div className='employee-gallery-box'>

                        </div>
                    </div>
                    <div className='newjoinee-container'>
                        <div className='newjoinee-text'>
                            <Typography variant='body1'>New Joinee</Typography>
                        </div>
                        <div className='newjoinee-box'>

                        </div>
                    </div>

                </div>
                <div className='container-content-row-7'>
                    <div className='container-content-row-6'>
                        <div className='madhuban-container'>
                            <div className='madhuban-icon'>
                                <img src={tree}></img>
                            </div>
                            <div className='madhuban-text last'>
                                <p>Madhuban</p>
                            </div>
                        </div>
                        <div className='container-content-sub-row-6'>
                            <div className='cricket-container'>
                                <div className='cricket-icon'>
                                    <img src={cricket}></img>
                                </div>
                                <div className='cricket-text'>
                                    <p>Cricket </p>
                                </div>
                            </div>
                            <div className='tennis-container'>
                                <div className='tennis-icon'>
                                    <img src={tennis}></img>
                                </div>
                                <div className='tennis-text'>
                                    <p>Tennis</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='article-container'>
                        <div className='article-text'>
                            <Typography variant='body1'>Article</Typography>
                        </div>
                        <div className='article-box'></div>
                    </div>
                    <div className='trophy-container'>
                        <div className='trophy-text'>
                            <Typography variant='body1'>Achievement</Typography>
                        </div>
                        <div className='trophy-box'>
                                <Achievementcard/>
                        </div>
                    </div>
                </div>
                <div className='container-content-row-8'>
                    <div className='business-gallery-container'>
                        <div className='business-gallery-text'>
                            <Typography variant='body1'>Business Gallery</Typography>
                        </div>
                        <div className='business-gallery-box'>
                            <img src="/infrastructure-img1.jpg"></img>
                        </div>
                    </div>
                    <div className='container-content-sub-row-8'>
                        <div className='hr-hrzone-container'>
                            <div className='hr-container'>
                                <div className='hr-text'>
                                    <Typography variant='h4'>HRMS</Typography>
                                    <Typography className='adrenaline' sx={{ marginLeft: 3 + "rem" }} variant='body1'>Adrenaline</Typography>
                                </div>
                            </div>
                            <div className='hrzone-container'>
                                <div className='hrzone-text'>
                                    <Typography variant='h4'>HR</Typography>
                                    <Typography variant='h4'>Zone</Typography>
                                </div>
                            </div>
                        </div>
                        <div className='admin-all-container'>
                            <div className='admin-container'>
                                <div className='admin-text'>
                                    <Typography variant='h4'>ADMIN</Typography>
                                    <Typography className='adrenaline' sx={{ marginLeft: 3 + "rem" }} variant='h6'>System</Typography>
                                </div>
                            </div>
                            <div className='all-container'>
                                <div className='all-text'>
                                    <Typography variant='h6'>All</Typography>
                                    <Typography variant='h4'>SYSTEM</Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container-content-row-9'>
                    <div className='container-content-sub-row-9'>
                        <div className='tpm-none-container'>
                            <div className='tpm-container'>
                                <div className='tpm-text'>
                                    <Typography variant='h4'>TPM</Typography>
                                    <Typography className='adrenaline' variant='h6'>Total Productive System</Typography>
                                </div>
                            </div>
                            <div className='none-container'>
                                <div className='none-text'>
                                    <Typography variant='h4'>Non Moving</Typography>
                                    <Typography variant='h6'>Items</Typography>
                                </div>
                            </div>
                        </div>
                        <div className='oracle-container'>
                            
                                <div className='oracle-text'>
                                    <Typography variant='h4'>ORACLE</Typography>
                                    <Typography className='adrenaline' variant='h6'>Business Intelligence</Typography>
                                
                            </div>
                        </div>
                    </div>
                    <div className='videos-container'>
                        <div className='videos-text'>
                            <Typography variant='body1'>Videos</Typography>
                        </div>
                        <div className='videos-box'>
                            <img src="/infrastructure-img1.jpg"></img>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
