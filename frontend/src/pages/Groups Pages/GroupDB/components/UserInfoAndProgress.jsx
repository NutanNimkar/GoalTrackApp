import React from 'react';
import { HiUserCircle } from 'react-icons/hi2';
import ProgressCharts from './ProgressCharts';
import TrackProgressCard from './TrackProgressCard';

const UserInfoAndProgress = ({ members }) => (
  <div className="flex flex-col gap-2">
    {members.map((member, idx) => (
      <div
        key={member}
        className={`flex items-center gap-4 rounded-xl p-3 border border-border ${idx % 2 === 0 ? 'bg-surface' : 'bg-surface-2'}`}
      >
        {/* Member name */}
        <div className="flex items-center gap-2 w-1/4 shrink-0">
          <HiUserCircle className="w-8 h-8 text-text-secondary shrink-0" />
          <span className="text-sm text-text-primary font-medium truncate">{member}</span>
        </div>
        {/* Chart */}
        <div className="flex-1">
          <ProgressCharts index={idx} />
        </div>
        {/* Score card */}
        <div className="w-1/4 shrink-0">
          <TrackProgressCard />
        </div>
      </div>
    ))}
  </div>
);

export default UserInfoAndProgress;
