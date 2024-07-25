import React, { useState } from 'react';
import './VerticalNavigation.css';
import Logo from "../Images/Logo-v2.PNG";
import Group from "../Images/users-group-rounded-svgrepo-com.svg";
import Home from "../Images/home-alt-3-svgrepo-com.svg";
import Logout from "../Images/log-out-04-svgrepo-com.svg";
import { useLogOut } from "../hooks/useLogOut";


const VerticalNavigation = () => {
  const { logout } = useLogOut();
  const [closeMenu, setCloseMenu] = useState(false);

  const handleCloseMenu = () => {
    setCloseMenu(!closeMenu);
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();
    logout();
  }

  return (
    <div className={closeMenu === false ? "vertical-navbar" : "vertical-navbar active"}>
      <div className={closeMenu === false ? "Logocontainer" : "Logocontainer active"}>
        <img src={Logo} className="Logo" alt='Logo' onClick={handleCloseMenu} />
        <h1 className='title'>GOALSEEK</h1>
      </div>
      <div className={closeMenu === false ? "contentsContainer" : "contentsContainer active"}>
        <ul className='ListContent'>
          <li className='ListHome'>
            <img src={Home} className='Homepic' alt='Home' />
            <a href="/">HOME</a>
          </li>
          <li>
            <img src={Group} className='Grouppic' alt='Group' />
            <a href="/task">Task</a>
          </li>
          <li>
            <img src={Group} className='Grouppic' alt='Group' />
            <a href="/groups">GROUPS</a>
          </li>
          {/* <li><img src={Friends} className='Friendspic' alt='Friends' /><a href="/friends">FRIENDS</a></li> */}
          <li className='LogoutContainer' onClick={handleLogoutClick}>
            <img src={Logout} className='Logopic' alt='Logout' />
            <button className='logout-button'>LOGOUT</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VerticalNavigation;
