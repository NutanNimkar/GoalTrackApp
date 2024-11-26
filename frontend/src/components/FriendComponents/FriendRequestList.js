import React, { useState, useEffect } from 'react';
import { useAuthContext } from "../../hooks/useAuthContext";
import createAxiosInstance from '../../axiosInstance';
import './FriendRequestList.css'; // Make sure to style the new layout here

//User recieved friend request components  
const FriendRequestComponent = () => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [sentFriendRequests, setSentFriendRequests] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tab, setTab] =useState(1);
  const { user: currentUser } = useAuthContext();
  const userId = currentUser?.id;
  const axiosInstance = createAxiosInstance(currentUser?.token);


const switchTab = (index) =>{
  setTab(index)

}


  useEffect(() => {
    const loadFriendRequests = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axiosInstance.get(`/api/friends/friend-requests/${userId}`);
        const friendRequestsList  = response.data;
        setFriendRequests(friendRequestsList);
      } catch (err) {
        setError('Error fetching friend requests');
      }
      setLoading(false);
    };

    loadFriendRequests();
  }, [userId]);

  const handleAcceptRequest = async (requestId) => {
    setLoading(true);
    setError('');
    console.log(requestId);
    try {
      await axiosInstance.post(`/api/friends/accept-req/${userId}`, {data:{
        friendIdentifier: requestId 
    }});
      await axiosInstance.post(`/api/friends/add-friends/${userId}`, {data:{
        friendId: requestId
    }});
      setFriendRequests(friendRequests.filter(req => req._id !== requestId));
    } catch (err) {
      setError('Error accepting friend request');
    }
    setLoading(false);
  };

  const handleDeclineRequest = async (requestId) => {
    console.log(userId, requestId)
    setLoading(true);
    setError('');
    try {
      await axiosInstance.delete(`/api/friends/decline-req/${userId}`, { data: { friendIdentifier: requestId } });
      setFriendRequests(friendRequests.filter(req => req._id !== requestId));
    } catch (err) {
      setError('Error declining friend request');
    }
    setLoading(false);
  };



  //User sent friend requests components

  useEffect(() => {
    const loadSentFriendRequests = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axiosInstance.get(`/api/friends/sentfriend-requests/${userId}`);
        const sentFriendRequestsList  = response.data; // assigning a new value
        console.log(sentFriendRequestsList);
        setSentFriendRequests(sentFriendRequestsList); 
      } catch (err) {
        setError('Error fetching friend requests');
      }
      setLoading(false);
    };

    loadSentFriendRequests();
  }, [userId]);


  const handleRemoveRequest = async (requestId) => {
    setLoading(true);
    setError('');
    try {
      await axiosInstance.delete(`/api/friends/request/remove/${userId}`, { data: { friendId: requestId }} );
      setFriendRequests(friendRequests.filter(req => req._id !== requestId));
    } catch (err) {
      setError('Error deleting friend request');
    }
    setLoading(false);
  };
  
  return (  
   
   
   <div className="friend-requests-container">
      
      <div className="friend-requests-tabs">
        <button
          className={tab === 1 ? 'friend-requests-tab-active' : 'friend-requests-tab'}
          onClick={() => switchTab(1)}
        >
          Friend Requests
        </button>

        <button
          className={tab === 2 ? 'sent-requests-tab-active' : 'sent-requests-tab'}
          onClick={() => switchTab(2)}
        >
          Sent Requests
        </button>
      </div>
      
    <div className={tab === 1 ? 'friend-requests-active' : 'friend-requests'}>
      <h2 className='friend-request-title'>Friend Requests</h2>
      {loading ? (
        <p className='friend-request-loading'>Loading...</p>
      ) : (
        <ul className='friend-request-list'>
          {Array.isArray(friendRequests) && friendRequests.length > 0 ? (
            friendRequests.map((request, index) => (
            <div className='friend-request-list-container'>
            <li className='friend-request-list-item' key={index}>
                {request.name} 
                <button className='friend-request-accept-button' 
                  onClick={() => handleAcceptRequest(request)} 
                  disabled={loading}
                >
                 
                </button>
                <button className='friend-request-decline-button' 
                  onClick={() => handleDeclineRequest(request)} 
                  disabled={loading}
                >
                </button>

               
              
              </li>
              </div>
            ))
          ) : (
            <p className='friend-request-alert'>No friend requests</p>
          )}
        </ul>
      )
    }
    </div>

  <div className={tab === 2 ? 'sent-requests-active' : 'sent-requests'}>
      <h2 className='sent-request-title'>Sent Friend Requests</h2>
      {loading ? (
        <p className='sent-request-loading'>Loading...</p>
      ) : (
      
        <ul className='sent-request-list'>
          {Array.isArray(sentFriendRequests) && sentFriendRequests.length > 0 ? (
            sentFriendRequests.map((request, index) => (
              <div className='sent-request-list-container'>
             <li className='sent-request-list-item' key={index}>
                {request.name} 
                <button className='sent-request-remove-button' 
                  onClick={() => handleRemoveRequest(request)} 
                  disabled={loading}
                >
                 
                </button>
              </li>
              </div>
            ))
          ) : (
            <p className='sent-request-alert'>No sent friend requests</p>
          )}
        </ul>
      )}

      {error && <p className='sent-request-error' style={{ color: 'red' }}>{error}</p>}
    </div>
  
    </div>)
};



export default FriendRequestComponent;