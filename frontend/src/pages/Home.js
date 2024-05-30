import React from 'react'
import VerticalNavigation from '../components/VerticalNavigation'
import Tile from '../components/Tile'
import Sidebar from '../components/Sidebar'
import PageHeader from '../components/PageHeader'
//import SidebarUser from '../components/SidebarUser'

const Home = () => {
  return (
    <div>
    <PageHeader></PageHeader>
    { <VerticalNavigation /> }
    <Tile title="Create a New Group" description="This is the description for Tile 1." />
    <Tile title="Join a Existing Group" description="This is the description for Tile 2." />
   <div className='App'>
    </div>
    </div>

)}; export default Home
