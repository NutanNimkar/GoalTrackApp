import React from "react";
import { Bar } from "react-chartjs-2";
import { Container } from "@mui/joy";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  plugins,
  scales
} from "chart.js";
import { borderRadius, display, width } from "@mui/system";
import plugin from "tailwindcss/plugin";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function ProgressCharts({index}) {
  const data = {
    labels: [""],
    datasets: [
      {
        label: `Missed Days`,
        data: [Math.floor(Math.random() * 31)],
        backgroundColor: "#FF5757",
        borderRadius: 30,
      },
      {
        label: `Completed Days`,
        data: [Math.floor(Math.random() * 31)],
        backgroundColor: "#00BF63",
        borderRadius: 30,
      },
    ],
  };

  const options = {
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
        display: false
      },
    }
  };

  return (
    <div style={{ backgroundColor: index % 2 === 0 ? "#022D66" : "#0B3A79", width: "100%", height: "16vh" }}>
      <Bar data={data} options={options}></Bar>
    </div>
  );
}

export default ProgressCharts;
