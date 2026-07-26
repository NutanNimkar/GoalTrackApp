import React from 'react';
import { Link } from 'react-router-dom';
import { HiUser } from 'react-icons/hi2';
import UserInfoAndProgress from './UserInfoAndProgress';

const GroupProgress = ({ name, members, description, punishment }) => (
  <div className="bg-surface border border-border rounded-xl overflow-hidden">
    <div className="flex items-center justify-between px-5 py-4 border-b border-border">
      <div>
        <h2 className="text-sm font-semibold text-text-primary">Group Progress</h2>
        <p className="text-xs text-text-secondary mt-0.5">Task completion per member</p>
      </div>
      <Link
        to={{ pathname: `/groups/${name}/personaldb` }}
        state={{ name, members, description, punishment }}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
          border border-border text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors"
      >
        <HiUser className="w-3.5 h-3.5" /> Personal Dashboard
      </Link>
    </div>
    <div className="p-4">
      {members?.length ? (
        <UserInfoAndProgress members={members} />
      ) : (
        <p className="text-text-secondary text-sm text-center py-4">No members to display.</p>
      )}
    </div>
  </div>
);

export default GroupProgress;
