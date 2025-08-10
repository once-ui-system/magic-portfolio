// components/GitHubCalendarSection.tsx
"use client";

import GitHubCalendar from "react-github-calendar";

export default function GitHubCalendarSection() {
  return (
    <section style={{ marginBottom: "4rem" }}>
      <h1
        style={{
          paddingBottom: "2rem",
          display: "flex",
          justifyContent: "center",
          fontSize: "2.5rem",
          fontWeight: "bold",
          margin: 0,
        }}
      >
        GitHub Activity Calendar
      </h1>
      <div
        style={{
          paddingBottom: "2rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <GitHubCalendar username="Awii21" blockSize={13} blockMargin={5} fontSize={18} />
      </div>
    </section>
  );
}
