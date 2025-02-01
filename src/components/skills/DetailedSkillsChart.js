"use client";

// components/SkillsChart.js
import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, plugins } from "chart.js";
import { Bar } from "react-chartjs-2";
import styles from "./SkillsChart.module.scss";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const individualCategoryData = {
    "Frontend Development and UI Design": {
        skills: ["HTML", "CSS", "JavaScript", "Typescript",
                "React.js", "Next.js", "Tailwind CSS", "Bootstrap", 
                "User-centric Design", "Accessibility Standards", "Responsive Design",
                "Modular UI Components", "Vite", "Remix", "GraphQL", "Wireframes"],
        ratings: [9, 8, 7, 6, 7, 7, 5, 3, 7, 7, 7, 7, 7, 5, 6, 6],
    },
    "Backend Development and Cloud Expertise": {
        skills: ["Python", "C#", "Node.js", "Django Rest Framework", "Django", "SQL", "Flask",
                "RESTful APIs", "AWS S3", "Netlify", "Heroku", "Docker", "Kubernetes", "Gunicorn"],
        ratings: [8, 5, 7, 7, 7, 6, 7, 7, 3, 7, 7, 7, 7, 6],
    },
    "Databases, Data Management, Data Analysis, and Data Visualisation": {
        skills: ["SQL","PostgreSQL", "SQLite", "BigQuery", "Data Migrations", 
                "Airbyte", "DagsterUI", "NumPy", "SciPy", "Matplotlib", "chart.js",
                "Entity-Relationship Diagrams", "ETL/ELT Pipelines"],
        ratings: [6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 7, 5, 5],
    },
    "Scrum, Agile and DevOps": {
        skills: ["Professional Scrum Master (PSM I)", "Servant Leadership", "Lean-Agile Leadership", "Scrum Team Coaching",
                "Scaled Agile Framework (SAFe 6.0)", "SAFe Scrum Master Role", "Flow Metrics (SAFe 6.0)", "Team Syncs & Stand-Ups",
                "Conflict Resolution", "Facilitating Agile Ceremonies", "Kanban", "CI/CD Pipelines", "CALMR Approach",
                "Cloud Infrastructure", "Version Control", "Jira", "Trello" ],
        ratings: [7, 8, 7, 7, 7, 6, 5, 7, 8, 7, 7, 7, 4, 5, 7, 6, 8],
    },
    "Version Control and Collaboration Tools": {
        skills: ["Git", "GitHub", "GitLab", "Slack", "Jira", "Trello", "Microsoft Teams", "Code Collaboration"],
        ratings: [7, 7, 5, 7, 6, 8, 7, 7],
    },
};

export default function DetailedSkillsChart({ category })   {
    const categoryData = individualCategoryData[category];
    if (!categoryData) return null;

  // Chart.js data
    const data = {
        labels: categoryData.skills,
        datasets: [
        {
            label: "Skill Rating (1-10)",
            data: categoryData.ratings,
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
                text: `${category} Skills`,
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