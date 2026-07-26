import React from 'react';
import AppShell from '../components/AppShell';
import FriendSearch from '../components/FriendComponents/FriendSearch';
import FriendRequestList from '../components/FriendComponents/FriendRequestList';
import FriendsList from '../components/FriendComponents/FriendList';

const FriendPage = () => (
  <AppShell title="Friends">
    <div className="flex flex-col gap-5 max-w-2xl">
      <FriendSearch />
      <FriendRequestList />
      <FriendsList />
    </div>
  </AppShell>
);

export default FriendPage;
