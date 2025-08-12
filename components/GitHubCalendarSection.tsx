// components/GitHubCalendarSection.tsx
"use client";

import GitHubCalendar from "react-github-calendar";

export default function GitHubCalendarSection() {
  return (
    <section className="mb-16">
      <h1 className="mb-32 flex justify-center text-2xl sm:text-lg md:text-xl lg:text-2xl font-bold m-0">
        GitHub Activity Calendar
      </h1>
      <div className="pb-8 flex justify-center">
        <GitHubCalendar username="Awii21" blockSize={13} blockMargin={5} fontSize={18} />
      </div>
    </section>
  );
}
