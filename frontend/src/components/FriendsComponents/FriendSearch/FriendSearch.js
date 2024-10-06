import React from 'react'
import { useState } from 'react'



const FriendSearch = ({addFriend}) => {

    const [friend, setFriend] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        addFriend ({
            name: friend,
            id: Date.now() //change to proper id in database

        })
        setFriend("")
    }

  return (
        <form className='searchbox'
        onSubmit={handleSubmit}>

            <div className='searchbox-wrapper'>
                <input 
                    type='text'
                    id='username' //task
                    className='usersearch' //input
                    value ={friend} //task
                    onInput={(e)=> setFriend (e.target.value)} //setTask
                    required
                    autoFocus
                    maxLength={20}
                    placeholder='Enter Username'

                    />
                <label 
                    htmlFor='username'
                    className='label'
                    >Enter Username</label>

            </div>
            <button className='btn'
            aria-label='Send Friend Request'
            type='submit'>

            </button>

        </form>
  )
}

export default FriendSearch