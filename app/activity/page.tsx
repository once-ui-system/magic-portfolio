// app/projects/page.tsx
import { Suspense } from "react";
import { Column } from "@once-ui-system/core";
import GitHubCalendarSection from "@/components/GitHubCalendarSection";
import Repositories from "@/components/Repositories";
import ReposSkeleton from "@/components/ReposSkeleton";
import ClientErrorBoundary from "@/components/ClientErrorBoundary";

export default async function ProjectPage() {
  return (
    <Column maxWidth="m">
      {/* Always renderable, independent of repo fetch */}
      <GitHubCalendarSection />

      {/* Only repositories are wrapped in Suspense */}
      <ClientErrorBoundary
        fallback={
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <p>
              We couldn’t load repositories right now. Please try again later.
            </p>
          </div>
        }
      >
        <Suspense fallback={<ReposSkeleton />}>
          {/* Repos are a client component that can suspend/handle their own errors */}
          <Repositories columns="2" thumbnail={false} />
        </Suspense>
      </ClientErrorBoundary>
    </Column>
  );
}
