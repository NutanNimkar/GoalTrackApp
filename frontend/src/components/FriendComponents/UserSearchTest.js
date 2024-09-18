
import React, { useState, useEffect } from 'react';
import { useAuthContext } from "../../hooks/useAuthContext";// Use the custom hook to access auth context
import axios from 'axios';
import './FriendPageTest.css'

const FriendRequestComponent = ({ UserId}) => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [newRequestReceiver, setNewRequestReceiver] = useState('');
  const [newReceiverId, setNewReceiverId] = useState('66ea2d4420dbbcc14dbb7509');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { user: currentUser } = useAuthContext();
  const userId = currentUser?.id;

  // useEffect(() => {
  //   const loadFriendRequests = async () => {
  //     setLoading(true);
  //     setError('');
  //     try {
  //       const response = await axios.get(`/api/friend-request/${userId}`);
  //       const { friendRequestsList } = response.data;
  //       setFriendRequests(friendRequestsList);
  //     } catch (err) {
  //       setError('Error fetching friend requests');
  //     }
  //     setLoading(false);
  //   };

  //   loadFriendRequests();
  // }, [userId]);

  const handleSendRequest = async () => {
  
      // if (!newRequestReceiver) {
      //   setError('Username cannot be empty');
      //   return;
      // }
  
      // setLoading(true);
      // setError('');
  
      // try {
      //   const response = await axios.get(`/api/user-id/${newRequestReceiver}`) ;
      //   setNewReceiverId(response.data.id); // Assuming the response has a property 'id'
      //   setError('');
      // } catch (err) {
      //   setNewReceiverId(null);
      //   if (err.response && err.response.status === 404) {
      //     setError('User not found');
      //   } else {
      //     setError('Error fetching user data');
      //   }
      // }
      

    if (newReceiverId) {
      setLoading(true);
      setError('');
      try {
        await axios.post(`/api/friends/send-req/${userId}`, {
          friendId: '66ea2d4420dbbcc14dbb7509' //only need to send user id and friend id
        });
        setNewRequestReceiver('');
        // Refresh the friend requests list after sending a request
        const response = await axios.get(`/api/friend-request/${userId}`);
        setFriendRequests(response.data);
      } catch (err) {
        setError('Error sending friend request');
      }
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (requestId) => {
    setLoading(true);
    setError('');
    try {
      await axios.post(`/api/accept-req/${userId}`, {
        requestID: requestId 
      });
      
      await axios.post(`/api/add-friends/${userId}`, {
        requestId: requestId
      });
      setFriendRequests(friendRequests.filter(req => req._id !== requestId));
    } catch (err) {
      setError('Error accepting friend request');
    }
    setLoading(false);

  };

  const handleDeleteRequest = async (requestId) => {
    setLoading(true);
    setError('');
    try {
      await axios.delete(`/api/request/remove/${userId}`, { RequestID: requestId }
      );
      setFriendRequests(friendRequests.filter(req => req._id !== requestId));
    } catch (err) {
      setError('Error deleting friend request');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Send Friend Request</h2>
      <input
        type="text"
        value={newRequestReceiver}
        onChange={(e) => setNewRequestReceiver(e.target.value)}
        placeholder="Enter user ID"
      />
      <button onClick={handleSendRequest} disabled={loading}>
        {loading ? 'Sending...' : 'Send Request'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Friend Requests</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {friendRequests.length > 0 ? (
            friendRequests.map(request => (
              <li key={request._id}>
                {request.senderName}
                <button 
                  onClick={() => handleAcceptRequest(request._id)} 
                  disabled={loading}
                >
                  {loading ? 'Accepting...' : 'Accept'}
                </button>
                <button 
                  onClick={() => handleDeleteRequest(request._id)} 
                  disabled={loading}
                >
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
              </li>
            ))
          ) : (
            <p>No friend requests</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default FriendRequestComponent;