import React from 'react'
import styles from './FriendItem.module.css'
 const FriendItem = ({friend}) => {
  return (
    <li className={styles.friend}>
       <div className={styles['friend-group']}>
        <label
        htmlFor={friend.id}
        className={styles.label}>
        </label>
        {friend.name}

       </div>

    </li>
  )
}
export default FriendItem