import React, { useState } from 'react'
import './SideBar.css'
import Logo from "../Images/Logo.png"
import Group from "../Images/Group.png"
import Home from "../Images/home-1.svg"
import Friends from "../Images/networking.png"
import List from "../Images/list-1-svgrepo-com.svg"
import Settings from "../Images/settings.png"
/*import LogOut from "../Images/exit.png"*/
import { useLocation } from 'react-router-dom';

/* const SideBar = () => {
return (
   
    <nav className="navbar">
    <ul className='navbar-nav'>
      <li className='logo'><img src={Logo} className='Logo' alt='Logo'/><a href="/" className='nav-title'><span className='logo-text'>GOALSEEK</span></a></li>
      <li className='nav-item'><img src={Home} className='listpic' alt='Home'/><a href="/" className='nav-'><span className='link-text'>Home</span></a></li>
      <li className='nav-item'><img src = {List} className='listpic'alt='List'/><a href="/task" className='nav-link'><span className='link-text'>Task Details</span></a></li>
      <li className='nav-item'><img src = {Group} className='listpic' alt='Group'/><a href="/group" className='nav-link'><span className='link-text'>Groups</span></a></li>
      <li className='nav-item'><img src={Friends} className='listpic' alt='Friends'/><a href="/friends" className='nav-link'><span className='link-text'>Friends</span></a></li>
      <li className='nav-item'><a href="/Login" className='nav-link'></a><span className='link-text'>Login</span></li>
      <li className='nav-item'><img src ={Settings} className='listpic' alt='Settings'/><a href="/Settings" className='nav-link'><span className='link-text'>Settings</span></a></li>
      <li className='nav-item'><img src ={LogOut} className='listpic' alt='LogOut'/><a href="/SignOut" className='nav-link'><span className='link-text'>Sign Out</span></a></li>
    </ul>
  </nav>
)
}

export default SideBar */

const SideBar = () => {
  const location =useLocation();

  const [closeMenu, setCloseMenu] = useState(false);

  const handleCloseMenu = () => {
      setCloseMenu(!closeMenu);
  };

  return (
      <div className={closeMenu === false ? "SideBar" : "SideBar active"}>
          <div
              className={
                  closeMenu === false
                      ? "logoContainer"
                      : "logoContainer active"
              }
          >
              <img src={Logo} alt="Logo" className="logo" />
              <h2 className="title">GOALSEEK </h2>
          </div>
          <div
              className={
                  closeMenu === false
                      ? "burgerContainer"
                      : "burgerContainer active"
              }
          >
              <div
                  className="burgerTrigger"
                  onClick={() => {
                      handleCloseMenu();
                  }}
              ></div>
              <div className="burgerMenu"></div>
          </div>
         {/* <div
              className={
                  closeMenu === false
                      ? "profileContainer"
                      : "profileContainer active" 
              }
          >
              {/* <img src={Profile} alt="profile" className="profile" />
              <div className="profileContents">
                  <p className="name">Hello, John👋</p>
                  <p>johnsmith@gmail.com</p>
              </div>
          </div> */}



          <div
              className={
                  closeMenu === false
                      ? "contentsContainer"
                      : "contentsContainer active"
              }
          >
              <ul>
                  <li className={location.pathname === "/" ? "active" : ""}>
                      <img src={Home} className='ulimagehome' alt="home" />
                      <a href="/">Home</a>
                  </li>
                  <li
                      className={
                          location.pathname === "/Group"
                              ? "active"
                              : ""
                      }
                  >
                      <img src={Group} className='ulimage'  alt="Groups" />
                      <a href="/Group">Groups</a>
                  </li>
                  <li
                      className={
                          location.pathname === "/Friends" ? "active" : ""
                      }
                  >
                      <img src={Friends} className='ulimage'  alt="Friends" />
                      <a href="/Friends">Friends</a>
                  </li>
                  <li
                      className={
                          location.pathname === "/Tasks" ? "active" : ""
                      }
                  >
                      <img src={List} className='ulimage' alt="List" />
                      <a href="/Tasks">Task Manager</a>
                  </li>
                  <li
                      className={
                          location.pathname === "/settings" ? "active" : ""
                      }
                  >
                      <img src={Settings} className='ulimage' alt="Settings" />
                      <a href="/settings">Settings</a>
                  </li>
                {/*   <li
                      className={
                          location.pathname === "/LogOut" ? "active" : ""
                      }
                  >
                      <img src={LogOut} className='ulimage' alt="Support" />
                      <a href="/logout">Log Out</a>
                  </li> */}
              </ul>
          </div>
      </div>
  );
};

export default SideBar;
