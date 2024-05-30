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
//   return (
//     <div class="container">
//     <nav class="side-nav">
//     <ul class="nav-menu">
//       <li class="nav-item"><a href="#"><i class="fas fa-tachometer-alt"></i><span class="menu-text">Dashboard</span></a></li>
//       <li class="nav-item"><a href="#"><i class="fas fa-user"></i><span class="menu-text">Users</span></a></li>
//       <li class="nav-item active"><a href="#"><i class="fas fa-file-alt"></i><span class="menu-text">Posts</span></a></li>
//       <li class="nav-item"><a href="#"><i class="fas fa-play "></i><span class="menu-text">Media</span></a></li>
//       <li class="nav-item"><a href="#"><i class="fas fa-sign-out-alt"></i><span class="menu-text">exit</span></a></li>
//     </ul>
//   </nav>
// </div>

return (
   
    <nav className="vertical-navbar">

    <div className='Logocontainer'>
      <img src={Logo} className = "Logo"/>
      <h1 className='title'>GOALSEEK</h1>
    </div>
<div className='Profilecontainer'>
  <img src ={User} className='UserProfile'/>
  <h5 className = 'Username'>Username</h5>
</div>
  <div className='Breakline1'>
  <h6 className ="Activities">ACTIVITIES</h6>
  </div>
    <ul className='ListContent'>
      <li className='ListHome'><img src={Home} className='Homepic'></img><a href="/">Home</a></li>
      <li><img src = {List} className='Listpic'></img><a href="/task">Task Details</a></li>
      <li ><img src = {Group} className='Grouppic'></img><a href="/group">Groups</a></li>
      <li><img src={Friends}className='Friendspic'></img><a href="/friends">Friends</a></li>
      <li><a href="/task">Task Details</a></li>
      {/* <li><a href="/setting">Settings</a></li> */}
    </ul>
  <div className='Breakline2'>
    <h6 className='settings'>USER PREFERENCES</h6>
  </div>
  <ul>
      <li><img src ={Settings} className='Settingspic'></img><a href="/Settings">Settings</a></li>
      <li><img src ={LogOut} className='Logoutpic'></img><a href="/SignOut">Sign Out</a></li>
    </ul>


  </nav>
)
}

export default VerticalNavigation;