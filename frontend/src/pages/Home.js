import React from 'react'
import VerticalNavigation from '../components/VerticalNavigation'
import Tile from '../components/Tile'

const Home = () => {
  return (
    <div>
    <h1>Home</h1>
    <VerticalNavigation />
    <Tile title="Tile 1" description="This is the description for Tile 1." />
    <Tile title="Tile 2" description="This is the description for Tile 2." />
    </div>
  )
}

export default Home
