import React, {useState} from 'react'
import { useLocation } from 'react-router-dom'
import './VerticalNavigation.css'
import Logo from "../Images/Logov3.PNG"
import Group from "../Images/users-group-rounded-svgrepo-com.svg"
import Home from "../Images/home-alt-3-svgrepo-com.svg"
import Friends from "../Images/network-1-svgrepo-com.svg"
import Logout from "../Images/log-out-04-svgrepo-com.svg"
import {useLogOut} from "../hooks/useLogOut"


const VerticalNavigation = () => {

  const { logout } = useLogOut()
  const location =useLocation();
  const [closeMenu, setCloseMenu] = useState(false);

  const handleCloseMenu = () => {
      setCloseMenu(!closeMenu);
  };

  const handleClick = () => {
   logout ()


  }

return (
  <div className={closeMenu === false ? "vertical-navbar" : "vertical-navbar active"}>


    <div
              className={
                  closeMenu === false
                      ? "Logocontainer"
                      : "Logocontainer active"
              }>
               <img src={Logo} className = "Navbar-Logo" alt='Logo'
                onClick={() => {
                handleCloseMenu();
                }} />
               <h1 className='Navbar-title'>GOALSEEK</h1>
    </div>


    <div
       className={
       closeMenu === false
            ? "contentsContainer"
             : "contentsContainer active"
       }>

            <ul className='Navbar-ListContent'>
              <li className='Navbar-ListItem-Home'><img src={Home} className='Navbar-Homepic' alt='Home'/><a href="/">HOME</a></li>
              <li className='Navbar-ListItem-Group'><img src = {Group} className='Navbar-Grouppic' alt='Group'/><a href="/groups">GROUPS</a></li>
              <li className='Navbar-ListItem-Friendspic'><img src={Friends} className='Navbar-Friendspic' alt='Friends'/><a href="/friends">FRIENDS</a></li>
              <li className='Navbar-ListItem-Logout'onClick={handleClick}><img src ={Logout} className='Navbar-Logopic' alt='Logout'></img><a>LOGOUT</a></li>
            </ul>
    
      
      </div>

      <div className={ 
       closeMenu === false
            ? "Navbar-Underline"
             : "Navbar-Underline active"
       }>
        
        </div> 


  </div>
)
}

export default VerticalNavigation