"use client";

// components/SkillsChart.js
import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, plugins } from "chart.js";
import { Bar } from "react-chartjs-2";
import styles from "./SkillsChart.module.scss";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DetailedSkillsChart = () => {
    const individualCategoryData = {
        "Frontend and UI Design": {
            skills: ["HTML", "CSS", "JavaScript", "React.js", "Next.js", "TypeScript", "Tailwind CSS"],
            ratings: [9, 8, 7, 7, 7, 6, 5],
        },
        "Backend and Cloud Development": {
            skills: ["Python", "C#", ".NET", "AWS S3", "SQL", "Node.js", "Django", "Flask", "RESTful APIs"],
            ratings: [9, 6, 6, 3, 6, 7, 7, 8, 7],
        },
        "Databases and Data Management": {
            skills: ["PostgreSQL", "SQLite", "Data Migrations"],
            ratings: [6, 6, 5],
        },
        "Agile and DevOps": {
            skills: ["Scrum Master Servant Leadership", "Jira", "CI/CD Pipelines", "Scaled Agile (SAFe)"],
            ratings: [9, 8, 8, 6],
        },
        "Version Control and Collaboration Tools": {
            skills: ["Git", "GitHub", "Slack", "Code Collaboration"],
            ratings: [7, 7, 7, 6],
        },
    };

  // Chart.js data
    const data = {
        labels: skills,
        datasets: [
        {
            label: "Skill Rating (1-10)",
            data: ratings,
            backgroundColor: "rgba(135, 206, 250, 0.5)", // Sky blue
            borderColor: "rgba(0, 123, 255, 1)", // Blue
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
            text: "Technical Skills Overview",
            font: { size: 18 },
        },
        },
        scales: {
        x: { 
            beginAtZero: true, 
            max: 10, 
            ticks: { font: { size: 14 } } 
        },
        y: { 
            ticks: { font: { size: 14 } } 
        }
        }
    };

    return (
        {Object.entries(individualCategoryData).map(([category, { skills, ratings }]) => (
        <div className={styles.chartContainer} key={category} >
        <Bar 
            data={{
            labels: skills, 
            datasets: [
                { 
                label: `${category} Skills`,
                data: ratings, 
                backgroundColor: "rgba(135, 206, 250, 0.5)",
                borderColor: "rgba(0, 123, 255, 1)",
                borderWidth: 1,
                barThickness: 10,
            },
            ],
        }} options={{
            ...options,
            plugins: { ...options.plugins, title: { text: `${category} Skills` }} 
        }}
        />        
        </div>
    ))}
    );
};

export default DetailedSkillsChart;
