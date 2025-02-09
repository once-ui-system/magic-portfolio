"use client";

// components/SkillsChart.js
import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { skillRatings } from "./SkillRatings";
import styles from "./SkillsChart.module.scss";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DetailedSkillsChart = ({ category }) => {
    const skills = skillRatings.categories[category] || [];
    const ratings = skills.map((skill) => skillRatings.ratings[skill] || 0);

  // Chart.js data
    const data = {
        labels: skills,
        datasets: [
        {
            label: "Skill Rating (1-10)",
            data: ratings,
            backgroundColor: "lightblue", 
            borderColor: "blue", 
            borderWidth: 1,
            barThickness: 10,
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
                text: `${category} Skills`,
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
                    autoSkip: false, // Disable auto-skipping of labels
                    maxRotation: 0, // Prevent rotation of labels
                    minRotation: 0, // Prevent rotation of labels
                },
            },
        },
    };

    return (
        <>
            <div className={styles.chartContainer} key={category} >
            <Bar data={data} options={options} />    
            </div>
        </>
    );
}

export default DetailedSkillsChart;