import React, { useState, useEffect } from 'react';
import { useAuthContext } from "../../hooks/useAuthContext";
import createAxiosInstance from '../../axiosInstance';
import './FriendPageTest.css'; // Make sure to style the new layout here

const FriendRequestComponent = ({ UserId }) => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [newRequestReceiver, setNewRequestReceiver] = useState('');
  const [newReceiverId, setNewReceiverId] = useState('66ea2d4420dbbcc14dbb7509');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [statusMessage, setStatusMessage] = useState(''); // For status feedback
  const { user: currentUser } = useAuthContext();
  const userId = currentUser?.id;
  const axiosInstance = createAxiosInstance(currentUser?.token);

  useEffect(() => {
    const loadFriendRequests = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axiosInstance.get(`/api/friends/friend-requests/${userId}`);
        const friendRequestsList  = response.data;
        console.log(friendRequestsList);
        setFriendRequests(friendRequestsList);
      } catch (err) {
        setError('Error fetching friend requests');
      }
      setLoading(false);
    };

    loadFriendRequests();
  }, [userId]);

  const handleSendRequest = async () => {
    if (newReceiverId) {
      setLoading(true);
      setError('');
      try {
        await axiosInstance.post(`/api/friends/send-req/${userId}`, {
          friendId: newReceiverId // Use the dynamic ID
        });
        setNewRequestReceiver('');
        setStatusMessage('Friend request sent successfully!'); // Success feedback

        // Refresh the friend requests list after sending a request
        const response = await axiosInstance.get(`/api/friends/friend-requests/${userId}`);
        setFriendRequests(response.data.friendRequestsList);
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
      await axiosInstance.post(`/api/accept-req/${userId}`, {
        requestID: requestId 
      });
      
      await axiosInstance.post(`/api/add-friends/${userId}`, {
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
      await axiosInstance.delete(`/api/request/remove/${userId}`, { data: { RequestID: requestId } });
      setFriendRequests(friendRequests.filter(req => req._id !== requestId));
    } catch (err) {
      setError('Error deleting friend request');
    }
    setLoading(false);
  };

  return (
    <div className="friend-page-container">
      {/* Send Friend Request Section */}
      <div className="send-request-container">
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
        {statusMessage && <p style={{ color: 'green' }}>{statusMessage}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      {/* Friend Requests Section */}
      <div className="friend-requests-container">
        <h2>Friend Requests</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {Array.isArray(friendRequests) && friendRequests.length > 0 ? (
              friendRequests.map((request, index) => (
                <li key={index}>
                  {request} 
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
    </div>
  );
};

export default FriendRequestComponent;
