import React, { useState, useEffect } from 'react';
import createAxiosInstance from '../../axiosInstance';
import { useAuthContext } from "../../hooks/useAuthContext"
import './FriendList.css';
import { useFriendRequests } from './FriendRequestContext';

const FriendsList = () => {
  const {friends, setFriends} = useFriendRequests();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user: currentUser } = useAuthContext();
  const axiosInstance = createAxiosInstance(currentUser?.token);
  const userId = currentUser?.id;

  // Directly extract user ID from the context
  // const userId = "66ea2d2920dbbcc14dbb74ce";

  useEffect(() => {
    const fetchFriends = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axiosInstance.get(`/api/friends/${userId}`)
        setFriends(response.data);
      } catch (err) {
        setError('Error fetching friends list');
      }
      setLoading(false);
    };

    fetchFriends();
  }, [userId]);

  const deleteFriend = async (friendName) => {
    if (window.confirm('Are you sure you want to delete this friend?')) {
      setLoading(true);
      setError('');
      try {
        console.log("requesting deletion:", friendName)
        await axiosInstance.delete(`/api/friends/remove/${userId}/${friendName}`);
        // Remove the friend from the local state
        setFriends(friends?.filter(friend => friend !== friendName));
      } catch (err) {
        setError('Error deleting friend');
      }
      setLoading(false);
    }
  };

  

  return (
    <div className='friends-list-container'>
      <h1 className='friends-list-title'>List of Friends</h1>
      {friends?.length === 0 ? (
        <p className='friends-list-alert'>No friends found.</p>
      ) : (
      <div className='friends-list-listcontainer'>
       <ul className='friends-list-ul'>
          {friends?.map((friend) => (
            <li className='friends-list-item' key={friend}>
              {friend ? friend : "undefined"}
              <button className='friends-list-delete-button'onClick={() => deleteFriend(friend)}>Delete</button>
            </li>
          ))}
        </ul>
        </div>
      )}
    </div>
  );
};

export default FriendsList;