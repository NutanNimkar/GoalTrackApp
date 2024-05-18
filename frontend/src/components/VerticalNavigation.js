import React from 'react'
import './VerticalNavigation.css'
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
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/task">Task Details</a></li>
      {/* <li><a href="/setting">Settings</a></li> */}
    </ul>
  </nav>
)
}

export default VerticalNavigation;