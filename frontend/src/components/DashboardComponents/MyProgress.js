// components/MyProgress.js
import React from 'react';
import './MyProgress.css';

const MyProgress = ({ streak, totalCompleted, daysRemaining, missedDays }) => {
  return (
    <div className="my-progress">
      <h2>My Progress</h2>
      <div className="progress-stats">
        <div className="stat">
          <h3>{streak} Days</h3>
          <p>My Streak</p>
        </div>
        <div className="stat">
          <h3>{totalCompleted} Days</h3>
          <p>Daily Completion</p>
        </div>
        <div className="stat">
          <h3>{missedDays} Days</h3>
          <p>Days Missed</p>
        </div>
        <div className="stat">
          <h3>{daysRemaining} Days</h3>
          <p>Days Remaining</p>
        </div>
      </div>
    </div>
  );
};

export default MyProgress;
