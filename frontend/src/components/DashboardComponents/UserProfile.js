import React from 'react';
import './UserProfile.css';

const UserProfile = ({ username }) => {
  return (
    <div className="user-profile">
      <span>{username}</span>
    </div>
  );
};

export default UserProfile;
