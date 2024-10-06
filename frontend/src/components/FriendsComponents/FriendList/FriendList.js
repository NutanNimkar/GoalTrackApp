import React from 'react'
import styles from './FriendList.module.css'
import FriendItem from './FriendItem'

const FriendList = ({friends}) => {
  return (
   <ul className= {styles.friend}>
    {friends.map(friend => (
        <FriendItem
        key={friend.id}
        friend={friend}
        />

    ))
    }
   </ul>
  )
}

export default FriendList