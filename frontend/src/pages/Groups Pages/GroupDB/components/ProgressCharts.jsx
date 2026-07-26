import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export function generateChartData() {
  return {
    labels: [''],
    datasets: [
      { label: 'Missed',    data: [9], backgroundColor: '#f87171', borderRadius: 6 },
      { label: 'Completed', data: [7], backgroundColor: '#B3E6A9', borderRadius: 6 },
    ],
  };
}

export function generateChartOptions() {
  return {
    indexAxis: 'y',
    scales: {
      x: { display: false, min: 0, max: 31 },
      y: { display: false, beginAtZero: true },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#8a8a8a', font: { size: 11 } }, align: 'start' },
    },
  };
}

const ProgressCharts = ({ index }) => (
  <div className={`w-full h-16 ${index % 2 === 0 ? 'bg-surface' : 'bg-surface-2'}`}>
    <Bar data={generateChartData()} options={generateChartOptions()} />
  </div>
);

export default ProgressCharts;
