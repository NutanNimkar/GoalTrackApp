import React from 'react';
import { generateChartData } from './ProgressCharts';

const TrackProgressCard = () => {
  const data = generateChartData();
  const completed = data.datasets[1].data[0];
  const missed = data.datasets[0].data[0];

  return (
    <div className="bg-surface-2 border border-border rounded-xl px-4 py-3 flex items-center justify-center gap-6">
      <div className="text-center">
        <p className="text-accent text-xl font-bold">{completed}</p>
        <p className="text-text-secondary text-xs mt-0.5">Done</p>
      </div>
      <div className="w-px h-8 bg-border" />
      <div className="text-center">
        <p className="text-danger text-xl font-bold">{missed}</p>
        <p className="text-text-secondary text-xs mt-0.5">Missed</p>
      </div>
    </div>
  );
};

export default TrackProgressCard;
