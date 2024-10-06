import React from 'react'
import { useState } from 'react'
import './FriendsPage.css'
import ContactList from './FriendList/FriendList'
import ContactSearch from './FriendSearch/FriendSearch'

export const FriendsPage = () => {

  const [friends, setFriends] = useState([])
  const addFriend = (friend) =>{
    setFriends(prevState => [... prevState, friend])

  }
  return (
    <div className='Friends_Container'>ContactList
 
    <ContactSearch 
    addFriend={addFriend}/>
     { friends && <ContactList friends={friends}/>}
    </div>
  )
}

export default FriendsPage;