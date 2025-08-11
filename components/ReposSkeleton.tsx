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
      <div 
        className="grid gap-3" 
        style={{ 
          gridTemplateColumns: `repeat(auto-fill, minmax(${minCardWidth}px, 1fr))`
        }}
      >
        {Array.from({ length: count }).map((_, i) => (
          <div 
            key={i} 
            className="rounded-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer motion-reduce:animate-none motion-reduce:bg-gray-200 motion-reduce:dark:bg-gray-700" 
            style={{ height: cardHeight }} 
            aria-hidden="true" 
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        
        .animate-shimmer {
          animation: shimmer 1.5s infinite linear;
        }
      `}</style>
    </section>
  );
}
