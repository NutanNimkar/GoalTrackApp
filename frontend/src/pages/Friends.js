
import React from 'react';
import { useAuthContext } from "../hooks/useAuthContext";// Use the custom hook to access auth context
import UserSearchTest from '../components/FriendComponents/UserSearchTest'; // Adjust import based on your file structure
import FriendListTest from '../components/FriendComponents/FriendListTest'; // Adjust import based on your file structure

const FriendPage = () => {
  // Get current user from authentication context
  const { user: currentUser } = useAuthContext();


console.log('Current User', currentUser);
  // Directly extract user ID from the context
  const userId = currentUser?.id;

  console.log('Current User ID:', userId);

  return (
    <div className='FriendComponents'>
      <UserSearchTest userId={userId} />
      <FriendListTest userId={userId} />
    </div>
  );
}

export default FriendPage;