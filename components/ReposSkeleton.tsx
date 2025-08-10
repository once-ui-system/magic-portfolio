"use client";

type ReposSkeletonProps = {
  count?: number;
  cardHeight?: number;
  minCardWidth?: number;
};

export default function ReposSkeleton({
  count = 6,
  cardHeight = 140,
  minCardWidth = 280,
}: ReposSkeletonProps) {
  return (
    <section aria-busy="true" aria-live="polite" aria-label="Loading repositories">
      <div className="grid" style={{ ["--minW" as any]: `${minCardWidth}px` }}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="card" style={{ height: cardHeight }} aria-hidden="true" />
        ))}
      </div>

      <style jsx>{`
        /* ---------- Theme tokens for shimmer ---------- */
        :global(html) {
          --skel-1: #e9ecef; /* light gray */
          --skel-2: #f8f9fa; /* lighter gray */
          --skel-3: #e9ecef;
        }

        /* System dark mode */
        @media (prefers-color-scheme: dark) {
          :global(html) {
            --skel-1: #2a2f3a; /* dark gray */
            --skel-2: #3a4250; /* mid gray */
            --skel-3: #2a2f3a;
          }
        }

        /* Class-based or data-attribute dark modes */
        :global(html.dark),
        :global(.dark),
        :global([data-theme="dark"]) {
          --skel-1: #2a2f3a;
          --skel-2: #3a4250;
          --skel-3: #2a2f3a;
        }

        /* ---------- Layout ---------- */
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(var(--minW, 280px), 1fr));
          gap: 12px;
        }

        .card {
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
