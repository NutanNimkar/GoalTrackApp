import React from 'react'
import './VerticalNavigation.css'
import Logo from "../Images/Logo.png"
import Group from "../Images/Group.png"
import Home from "../Images/home.png"
import User from "../Images/user.png"
import Friends from "../Images/networking.png"
import List from "../Images/list.png"
import Settings from "../Images/settings.png"
import LogOut from "../Images/exit.png"

const VerticalNavigation = () => {
return (
   
    <nav className="vertical-navbar">

    <div className='Logocontainer'>
      <img src={Logo} className = "Logo" alt='Logo'/>
      <h1 className='title'>GOALSEEK</h1>
    </div>
<div className='Profilecontainer'>
  <img src ={User} className='UserProfile' alt ='User Profile'/>
  <h5 className = 'Username'>Username</h5>
</div>
  <div className='Breakline1'>
  <h6 className ="Activities">ACTIVITIES</h6>
  </div>
    <ul className='ListContent'>
      <li className='ListHome'><img src={Home} className='Homepic' alt='Home'/><a href="/">Home</a></li>
      <li><img src = {List} className='Listpic'alt='List'/><a href="/task">Task Details</a></li>
      <li ><img src = {Group} className='Grouppic' alt='Group'/><a href="/group">Groups</a></li>
      <li><img src={Friends} className='Friendspic' alt='Friends'/><a href="/friends">Friends</a></li>
    </ul>
  <div className='Breakline2'>
    <h6 className='settings'>USER PREFERENCES</h6>
  </div>
  <ul>
      <li><img src ={Settings} className='Settingspic' alt='Settings'/><a href="/Settings">Settings</a></li>
      <li><img src ={LogOut} className='Logoutpic' alt='LogOut'/><a href="/SignOut">Sign Out</a></li>
    </ul>
  </nav>
)
}

export default VerticalNavigation