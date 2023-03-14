import { Avatar, IconButton } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import NotificationActiveIcon from '@material-ui/icons/NotificationsActive';
import SearhIcon from '@material-ui/icons/Search';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import React from "react";
import './Header.css';
const Header =()=>{
    return (
        <div className="header">
            <div className="header_left" >
            <img src={require('./the_red_owl.png')} alt="Red owl">
            </img>
            </div>
            <div className='header_center'>
                <div className='header_option'>
                    <SearhIcon fontsize='large'/>
                </div>
                <div className='header_option'>
                    <DescriptionIcon fontsize='large'/>
                </div>
                <div className='header_option'>
                    <SupervisedUserCircleIcon fontsize='large'/>
                </div>
            </div>
            <div className='header_right'>
                <div className='header_info'>
                    <Avatar/>
                    <h5>Samin</h5>
                </div>
                <IconButton><NotificationActiveIcon/></IconButton>  
                </div>
        </div>
    )
};
export default Header;