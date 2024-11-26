
import React, { useState } from 'react';
import { useAuthContext } from "../../hooks/useAuthContext";
import createAxiosInstance from '../../axiosInstance';
import './FriendSearch.css'; // Make sure to style the new layout here

const FriendSearchComponent = () => {
  const [newRequestReceiver, setNewRequestReceiver] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [statusMessage, setStatusMessage] = useState(''); // For status feedback
  const { user: currentUser } = useAuthContext();
  const userId = currentUser?.id;
  const axiosInstance = createAxiosInstance(currentUser?.token);

  const handleSendRequest = async () => {
    if (newRequestReceiver) {
      setLoading(true);
      setError('');
      try {
        console.log(newRequestReceiver);
        await axiosInstance.post(`/api/friends/send-req/${userId}`, {
          friendIdentifier: newRequestReceiver 
        });
        setNewRequestReceiver('');
        setStatusMessage('Friend request sent successfully!'); 
      } catch (err) {
        setError('Error sending friend request');
      }
      setLoading(false);
    }
  };

  return (
    <div className="send-request-container">
      <div className='send-request-titlecontainer'/>
      <h2 className='send-request-title'>Send Friend Request</h2>
      <p className='send-request-intro'>Enter the username of another user to send a friend request to the recipient</p>
      <div className='send-request-searchbar'>
      <input className='send-request-input'
        type="text"
        value={newRequestReceiver}
        onChange={(e) => setNewRequestReceiver(e.target.value)}
        placeholder="Enter user ID"
      />
      <button className='send-request-button'onClick={handleSendRequest} disabled={loading}>
        {loading ? 'Sending...' : 'Send'}
      </button>
      </div>
      {statusMessage && <p className='send-request-successmsg' style={{ color: 'green' }}>{statusMessage}</p>}
      {error && <p className='send-request-errormsg'style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FriendSearchComponent;