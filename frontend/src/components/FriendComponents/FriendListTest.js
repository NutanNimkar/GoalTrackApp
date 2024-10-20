import React, { useState, useEffect } from 'react';
import createAxiosInstance from '../../axiosInstance';
import { useAuthContext } from "../../hooks/useAuthContext"

const FriendsPage = ({ UserId }) => {
  const [friends, setFriends] = useState([]);
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
        const response = await axiosInstance.get(`/api/friends/friends/${userId}`)
        setFriends(response.data);
      } catch (err) {
        setError('Error fetching friends list');
      }
      setLoading(false);
    };

    fetchFriends();
  }, [userId]);

  const deleteFriend = async (friendId) => {
    if (window.confirm('Are you sure you want to delete this friend?')) {
      setLoading(true);
      setError('');
      try {
        await axiosInstance.delete(`/api/friends/${userId}`, {
          friendID: friendId}
        );
        // Remove the friend from the local state
        setFriends(friends.filter(friend => friend.id !== friendId));
      } catch (err) {
        setError('Error deleting friend');
      }
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Friends List</h1>
      {friends.length === 0 ? (
        <p>No friends found.</p>
      ) : (
        <ul>
          {friends.map((friend) => (
            <li key={friend.id}>
              {friend.name}
              <button onClick={() => deleteFriend(friend.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendsPage;