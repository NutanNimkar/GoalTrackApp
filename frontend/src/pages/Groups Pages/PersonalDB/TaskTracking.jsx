import React from 'react';
import ProgressCharts from '../GroupDB/components/ProgressCharts';
import TrackProgressCard from '../GroupDB/components/TrackProgressCard';

const TaskTracking = ({ tasks }) => {
  if (!tasks?.length) {
    return <p className="text-text-secondary text-sm text-center py-6">No tasks to track yet.</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {tasks.map((task, idx) => (
        <div
          key={task._id ?? idx}
          className={`flex items-center gap-4 rounded-xl p-3 border border-border ${idx % 2 === 0 ? 'bg-surface' : 'bg-surface-2'}`}
        >
          {/* Task name */}
          <div className="w-1/4 shrink-0">
            <p className="text-sm text-text-primary font-medium truncate">{task.name}</p>
            <p className={`text-xs mt-0.5 ${task.status ? 'text-accent' : 'text-text-muted'}`}>
              {task.status ? 'Completed' : 'Pending'}
            </p>
          </div>
          {/* Chart */}
          <div className="flex-1">
            <ProgressCharts index={idx} />
          </div>
          {/* Score */}
          <div className="w-1/4 shrink-0">
            <TrackProgressCard />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskTracking;
