"use client";
// components/ReposSkeleton.tsx
export default function ReposSkeleton() {
  return (
    <section>
      
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "12px",
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            style={{
              height: 140,
              borderRadius: 8,
              background: "linear-gradient(90deg, #eee, #f7f7f7, #eee)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.5s infinite",
            }}
          />
        ))}
      </div>
      <style jsx>{`
        /* ---------- Theme tokens ---------- */
        :root {
          --fg-title: #111827;                /* slate-900 */
          --skel-1: #e9ecef;                  /* light gray */
          --skel-2: #f8f9fa;                  /* lighter gray */
          --skel-3: #e9ecef;
        }

        /* System dark mode */
        @media (prefers-color-scheme: dark) {
          :root {
            --fg-title: #e5e7eb;              /* slate-200 */
            --skel-1: #2a2f3a;                /* dark gray */
            --skel-2: #3a4250;                /* mid gray */
            --skel-3: #2a2f3a;
          }
        }

        /* Optional class-based override (e.g., <html class="dark">) */
        :global(.dark) :root,
        :global(.dark) {
          --fg-title: #e5e7eb;
          --skel-1: #2a2f3a;
          --skel-2: #3a4250;
          --skel-3: #2a2f3a;
        }

        /* ---------- Layout ---------- */
        .repos-skeleton {
          padding: 0;
        }

        .title {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
          text-align: center;
          color: var(--fg-title);
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 12px;
        }

        .card {
          height: 140px;
          border-radius: 8px;
          background: linear-gradient(90deg, var(--skel-1), var(--skel-2), var(--skel-3));
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite linear;
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .card {
            animation: none;
            background: var(--skel-1);
          }
        }

        /* ---------- Animation ---------- */
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
}
