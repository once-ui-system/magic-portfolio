"use client";

import { useEffect, useState } from "react";
import Post from "@/components/blog/Post";
import ReposSkeleton from "./ReposSkeleton";
import clsx from "clsx";

interface GitHubActivityProps {
  columns?: "1" | "2" | "3";
  thumbnail?: boolean;
  direction?: "row" | "column";
}

interface Repository {
  id: string;
  name: string;
  description: string;
  updated_at: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  private: boolean;
  languages: Array<{ name: string; percentage: string }>;
  recent_commits: Array<{
    sha: string;
    commit: {
      message: string;
      author: { date: string; name: string };
    };
    html_url: string;
  }>;
}

interface ActivityEvent {
  id: string;
  type: string;
  description: string;
  repo: string;
  date: string;
  url: string;
}

interface GitHubData {
  profile: {
    username: string;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    total_stars: number;
    total_forks: number;
    languages_used: string[];
  };
  repositories: Repository[];
  recent_activity: ActivityEvent[];
  starred_repos: any[];
  gists: Array<{
    id: string;
    description: string;
    html_url: string;
    created_at: string;
    files: string[];
    public: boolean;
  }>;
}

const StatCard = ({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
}) => (
  <div className="rounded-xl border p-5 text-center shadow-sm">
    <div className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
      {value}
    </div>
    <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
      {title}
    </div>
    {subtitle && (
      <div className="mt-1 text-xs text-neutral-500 dark:text-neutral-500">
        {subtitle}
      </div>
    )}
  </div>
);

const ActivityItem = ({ activity }: { activity: ActivityEvent }) => {
  const icon = (type: string) => {
    switch (type) {
      case "Push":
        return "📝";
      case "Create":
        return "✨";
      case "Star":
        return "⭐";
      case "Fork":
        return "🍴";
      case "Issue":
        return "🐛";
      case "PR":
        return "🔄";
      default:
        return "📋";
    }
  };

  return (
    <a
      href={activity.url}
      target="_blank"
      rel="noreferrer"
      className="flex items-start gap-3 rounded-lg border border-neutral-200 p-4 transition hover:shadow-sm dark:border-neutral-800"
    >
      <span className="text-xl" aria-hidden>
        {icon(activity.type)}
      </span>
      <div className="flex-1">
        <div className="mb-1 text-sm text-neutral-900 dark:text-neutral-100">
          {activity.description}
        </div>
        <div className="text-xs text-neutral-500">
          {new Date(activity.date).toLocaleDateString()} • {activity.type}
        </div>
      </div>
    </a>
  );
};



type TabKey = "overview" | "repos" | "activity";

export default function GitHubActivity({
  columns = "2",
  thumbnail = false,
  direction,
}: GitHubActivityProps) {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  useEffect(() => {
    fetchGitHubData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchGitHubData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/repos`, {
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Failed to fetch GitHub data");
      const gitHubData = (await response.json()) as GitHubData;
      setData(gitHubData);
      console.log("GitHub data fetched successfully:", gitHubData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ReposSkeleton />;

  if (error) {
    return (
      <div className="mx-auto max-w-2xl rounded-xl border border-neutral-200 bg-white p-8 text-center shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          Error: {error}
        </p>
        <button
          onClick={fetchGitHubData}
          className="inline-flex items-center justify-center rounded-lg border border-neutral-200 bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 active:opacity-100 dark:border-neutral-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data) return null;

  const colClass =
    columns === "3"
      ? "md:grid-cols-3"
      : columns === "2"
      ? "md:grid-cols-2"
      : "md:grid-cols-1";

  const TabButton = ({ tab, label }: { tab: TabKey; label: string }) => {
    const isActive = activeTab === tab;
    return (
      <button
        onClick={() => setActiveTab(tab)}
        aria-selected={isActive}
        className={clsx(
          "rounded-lg px-8 py-4 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400",
          isActive
            ? "bg-neutral-900 text-white dark:bg-white dark:text-black"
            : "border border-neutral-300 text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
        )}
      >
        {label}
      </button>
    );
  };

  return (
    <section className="mt-4">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-2 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          Showcasing my development journey and contributions
        </h2>
      </div>

      {/* Tabs */}
      <div className="mx-auto mt-6 flex max-w-4xl flex-wrap justify-center gap-2">
        <TabButton tab="overview" label="Overview" />
        <TabButton
          tab="repos"
          label={`Repositories`}
        />
        <TabButton tab="activity" label="Recent Activity" />
      </div>

      {/* Content */}
      <div className="mx-auto mt-8 max-w-6xl px-2 sm:px-4">
        {activeTab === "overview" && (
          <div className="space-y-10">
            {/* Stats */}
            <div>
              <h3 className="mb-4 text-center text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                GitHub Stats
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                <StatCard
                  title="Public Repos"
                  value={data.profile.public_repos}
                />
                <StatCard
                  title="Starred Repos"
                  value={data.starred_repos.length}
                />
                <StatCard title="Followers" value={data.profile.followers} />
              </div>
            </div>

            {/* Languages */}
            <div>
              <h3 className="mb-8 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Languages I Work With (
                {data.profile.languages_used?.length ?? 0})
              </h3>
              {data.profile.languages_used?.length ? (
                <div className="flex flex-wrap gap-2">
                  {data.profile.languages_used.slice(0, 15).map((lang, idx) => (
                    <span
                      key={idx}
                      className="rounded-full px-3 py-2 text-sm font-medium text-neutral-800 border dark:text-neutral-200"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-neutral-500">
                  No languages detected yet.
                </div>
              )}
            </div>

            {/* Latest Repositories */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Latest Repositories
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {data.repositories.slice(0, 4).map((repo) => (
                  <Post
                    key={repo.id}
                    post={{
                      slug: repo.name,
                      metadata: {
                        title: repo.name,
                        description:
                          repo.description || "No description provided.",
                        publishedAt: repo.updated_at,
                        url: repo.html_url,
                        stars: repo.stargazers_count,
                        forks: repo.forks_count,
                        language: repo.language,
                        topics: repo.topics || [],
                        private: repo.private,
                      },
                    }}
                    thumbnail={thumbnail}
                    direction={direction}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "repos" && (
          <div>
            <h2 className="mb-4 text-center text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              All Repositories ({data.repositories.length})
            </h2>
            <div className={clsx("grid grid-cols-1 gap-6", colClass)}>
              {data.repositories.map((repo) => (
                <Post
                  key={repo.id}
                  post={{
                    slug: repo.name,
                    metadata: {
                      title: repo.name,
                      description:
                        repo.description || "No description provided.",
                      publishedAt: repo.updated_at,
                      url: repo.html_url,
                      stars: repo.stargazers_count,
                      forks: repo.forks_count,
                      language: repo.language,
                      topics: repo.topics || [],
                      private: repo.private,
                    },
                  }}
                  thumbnail={thumbnail}
                  direction={direction}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === "activity" && (
          <div>
            <h2 className="mb-4 text-center text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Recent Activity
            </h2>
            <div className="mx-auto grid max-w-3xl gap-3">
              {data.recent_activity.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
          </div>
        )}

        
      </div>
    </section>
  );
}
