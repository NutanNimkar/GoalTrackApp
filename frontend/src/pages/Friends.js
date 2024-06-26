import React from 'react'
import "../components/Friends_Page/Friends.css"
import {FriendsListWrapper} from '../components/Friends_Page/FriendsListWrapper'
import VerticalNavigation from '../components/VerticalNavigation' 


function Friends() {
  return (
    <div className="App">
      <VerticalNavigation/>
      <FriendsListWrapper/>
    </div>
  );
}

export default Friends;