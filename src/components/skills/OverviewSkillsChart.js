"use client";

// components/SkillsChart.js
import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import styles from "./SkillsChart.module.scss";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const calculateAverage = (ratings) => {
  return (ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(1);
};

const OverviewSkillsChart = () => {
  const categoriesData = [
  {
    category: "Frontend & UI Design",
    average: calculateAverage([9, 8, 7, 7, 7, 6, 5]),
  },
  {
    category: "Backend & Cloud Development",
    average: calculateAverage([8, 5, 5, 3, 5, 7, 7, 7, 7]),
  },
  {
    category: "Databases & Data Management",
    average: calculateAverage([6, 6, 5]),
  },
  {
    category: "Agile & DevOps",
    average: calculateAverage([9, 7, 7, 6]),
  },
  {
    category: "Version Control & Collaboration",
    average: calculateAverage([7, 7, 7, 6]),
  },
];

  const mainChartData = {
  labels: categoriesData.map((item) => item.category),
  datasets: [
    {
      label: "Average Skill Rating",
      data: categoriesData.map((item) => item.average),
      backgroundColor: "rgba(135, 206, 250, 0.5)",
      borderColor: "rgba(0, 123, 255, 1)",
      borderWidth: 1,
      barThickness: 30,
    },
  ],
};

   // Chart.js options
  const options = {
    indexAxis: "y", // Horizontal bar chart
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false, position: "top" },
      tooltip: { callbacks: { label: (ctx) => `Rating: ${ctx.raw}` } },
      title: {
        display: true,
        text: "Average Skill Ratings by Category",
        font: { size: 18 },
      },
    },
    scales: {
      x: { 
        beginAtZero: true, 
        max: 10, 
        ticks: { font: { size: 14 }, stepSize: 1 }, 
      },
      y: { 
        ticks: { 
          font: { size: 14 }, 
          callback: function (value, index, values) {
            const label = categoriesData[index]?.category || value;
          return String(label).split("&").join("&\n"); }, 
        },
      },
    },
  };


  return (
    <div className={styles.chartContainer}>
      <Bar data={mainChartData} options={options} />
    </div>
  );
};


export default OverviewSkillsChart;
