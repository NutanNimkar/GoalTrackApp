import React from "react";
import { Bar } from "react-chartjs-2";
import { Container } from "@mui/joy";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Define and export the data and options objects
export function generateChartData() {
  return {
    labels: [""],
    datasets: [
      {
        label: `Missed`,
        data:[9],
        backgroundColor: "#FF0808",
        borderRadius: 30,
      },
      {
        label: `Completed`,
        data:[7],
        backgroundColor: "#12B806",
        borderRadius: 30,
      },
    ],
  };
}

export function generateChartOptions() {
  return {
    indexAxis: "y",
    scales: {
      x: {
        ticks: {
          stepSize: 1, // Set step size for ticks
        },
        min: 0, // Minimum value on the x-axis
        max: 31, // Specify maximum value on the x-axis
        display: false
      },
      y: {
        beginAtZero: true,
        display: false
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: 'white'
        },
        align: 'start',
      },
    }
  };
}


function ProgressCharts({ index }) {
  const data = generateChartData();
  const options = generateChartOptions();

  return (
    <div style={{ backgroundColor: index % 2 === 0 ? "#022D66" : "#0B3A79", width: "100%", height: "16vh" }}>
      <Bar data={data} options={options}></Bar>
    </div>
  );
}

export default ProgressCharts;
