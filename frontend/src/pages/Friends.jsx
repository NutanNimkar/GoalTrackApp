
import React from 'react';
import UserSearch from '../components/FriendComponents/FriendSearch';
import FriendsList from '../components/FriendComponents/FriendList';
import FriendRequestList from '../components/FriendComponents/FriendRequestList'
import './Friends.css'

const FriendPage = () => {
 
  return (
    <div className='FriendComponents'>
      <UserSearch />
      <FriendRequestList />
      <FriendsList />
     
    </div>
  );
}

export default FriendPage;