import React from 'react';
import { Link } from 'react-router-dom';
import './VerticalNavigation.css';
import Logo from "../Images/Logo-v2.PNG";
import Group from "../Images/users-group-rounded-svgrepo-com.svg";
import Home from "../Images/home-alt-3-svgrepo-com.svg";
import Friends from "../Images/network-1-svgrepo-com.svg";
import Logout from "../Images/log-out-04-svgrepo-com.svg";
import { useLogOut } from "../hooks/useLogOut";
import { useNavigation } from '../Context/NavigationContext';


const VerticalNavigation = () => {
  const { logout } = useLogOut();
  const { closeMenu, setCloseMenu } = useNavigation();

  const handleCloseMenu = () => {
      setCloseMenu(!closeMenu);
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();
    logout();
  };

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
            <Link to="/">HOME</Link>
          </li>
          <li>
            <img src={Group} className='Grouppic' alt='Tasks' />
            <Link to="/task">TASK</Link>
          </li>
          <li>
            <img src={Group} className='Grouppic' alt='Groups' />
            <Link to="/groups">GROUPS</Link>
          </li>
          <li>
            <img src={Friends} className='Friendspic' alt='Friends' />
            <Link to="/friends">FRIENDS</Link>
          </li>
          <li className='LogoutContainer' onClick={handleLogoutClick}>
            <img src={Logout} className='Logopic' alt='Logout' />
            <button className='logout-button'>LOG OUT</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VerticalNavigation;
