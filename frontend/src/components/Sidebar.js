import React from 'react'
import "../App.css"
import Sidebardata, { SideboardData } from './SideboardData'


export const Sidebar = () => {
  return (
    <div className="Sidebar">
    <ul className='SidebarList'>
    {
        SideboardData.map((val, key)=> (
               
                <li 
                key={key} 
                className='row'
                id={window.location.pathname == val.link ? "active" : ""}
                onClick={()=>{window.location.pathname = val.link;
                }}
                >
                {""}
                <div id='icon'>{val.icon}</div>{""} <div id='title'>{val.title}</div>
                </li>
                
        )
        )
    }
    </ul>
</div>
  )
}



export default Sidebar;