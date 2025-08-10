"use client";

import { useEffect, useState } from "react";
import { Column, Grid, Card, Badge, Button } from "@once-ui-system/core";
import Post from "@/components/blog/Post";
import ReposSkeleton from "./ReposSkeleton";

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
  <div
    style={{
      padding: "1.5rem",
      backgroundColor: "var(--neutral-50)",
      borderRadius: "12px",
      textAlign: "center",
      border: "1px solid var(--neutral-200)",
    }}
  >
    <div
      style={{
        fontSize: "2rem",
        fontWeight: "bold",
        color: "var(--neutral-900)",
      }}
    >
      {value}
    </div>
    <div
      style={{
        fontSize: "0.875rem",
        color: "var(--neutral-600)",
        marginTop: "0.25rem",
      }}
    >
      {title}
    </div>
    {subtitle && (
      <div
        style={{
          fontSize: "0.75rem",
          color: "var(--neutral-500)",
          marginTop: "0.25rem",
        }}
      >
        {subtitle}
      </div>
    )}
  </div>
);

const ActivityItem = ({ activity }: { activity: ActivityEvent }) => {
  const getActivityIcon = (type: string) => {
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
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "0.75rem",
        padding: "1rem",
        backgroundColor: "var(--neutral-50)",
        borderRadius: "8px",
        border: "1px solid var(--neutral-200)",
      }}
    >
      <span style={{ fontSize: "1.25rem" }}>
        {getActivityIcon(activity.type)}
      </span>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: "0.875rem",
            color: "var(--neutral-800)",
            marginBottom: "0.25rem",
          }}
        >
          {activity.description}
        </div>
        <div style={{ fontSize: "0.75rem", color: "var(--neutral-500)" }}>
          {new Date(activity.date).toLocaleDateString()} • {activity.type}
        </div>
      </div>
    </div>
  );
};

const GistCard = ({ gist }: { gist: any }) => (
  <div
    style={{
      padding: "1rem",
      backgroundColor: "var(--neutral-50)",
      borderRadius: "8px",
      border: "1px solid var(--neutral-200)",
    }}
  >
    <div
      style={{
        fontSize: "0.875rem",
        fontWeight: "500",
        marginBottom: "0.5rem",
      }}
    >
      {gist.description || "Untitled Gist"}
    </div>
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.25rem",
        marginBottom: "0.5rem",
      }}
    >
      {gist.files.slice(0, 3).map((file: string, idx: number) => (
        <span
          key={idx}
          style={{
            fontSize: "0.75rem",
            padding: "0.125rem 0.5rem",
            backgroundColor: "var(--neutral-200)",
            borderRadius: "12px",
            color: "var(--neutral-700)",
          }}
        >
          {file}
        </span>
      ))}
    </div>
    <div style={{ fontSize: "0.75rem", color: "var(--neutral-500)" }}>
      Created {new Date(gist.created_at).toLocaleDateString()}
    </div>
  </div>
);

export default function GitHubActivity({
  columns = "2",
  thumbnail = false,
  direction,
}: GitHubActivityProps) {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "overview" | "repos" | "activity" | "gists"
  >("overview");

  useEffect(() => {
    fetchGitHubData();
  }, []);

  const fetchGitHubData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/repos`, {
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Failed to fetch GitHub data");

      const gitHubData = await response.json();
      setData(gitHubData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ReposSkeleton />;

  if (error) {
    return (
      <Column maxWidth="m">
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p>Error: {error}</p>
          <button
            onClick={fetchGitHubData}
            style={{
              padding: "0.55rem 1rem",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Retry
          </button>
        </div>
      </Column>
    );
  }

  if (!data) return null;

  const TabButton = ({
    tab,
    label,
    isActive,
    onClick,
  }: {
    tab: string;
    label: string;
    isActive: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      style={{
        padding: "0.75rem 1.5rem",
        backgroundColor: isActive ? "var(--neutral-900)" : "transparent",
        color: "var(--neutral-600)",
        border: "1px solid var(--neutral-300)",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: isActive ? "600" : "400",
        transition: "all 0.2s ease",
      }}
    >
      {label}
    </button>
  );

  return (
    <section style={{ marginTop: "1rem" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
          }}
        >
          Showcasing my development journey and contributions
        </h2>
      </div>

      {/* Navigation Tabs */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
        }}
      >
        <TabButton
          tab="overview"
          label="Overview"
          isActive={activeTab === "overview"}
          onClick={() => setActiveTab("overview")}
        />
        <TabButton
          tab="repos"
          label={`Repositories (${data.repositories.length})`}
          isActive={activeTab === "repos"}
          onClick={() => setActiveTab("repos")}
        />
        <TabButton
          tab="activity"
          label="Recent Activity"
          isActive={activeTab === "activity"}
          onClick={() => setActiveTab("activity")}
        />
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div>
          {/* Stats Overview */}
          <div style={{ marginBottom: "2rem" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              GitHub Stats
            </h2>
            <Grid columns="3" mobileColumns="2" gap="1" marginBottom="24">
              <StatCard
                title="Public Repos"
                value={data.profile.public_repos}
              />
              <StatCard
                title="Stared Repos"
                value={data.starred_repos.length}
              />
              <StatCard title="Followers" value={data.profile.followers} />
            </Grid>
          </div>

          {/* Languages Used */}
          <div style={{ marginBottom: "2rem" }}>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                marginBottom: "1rem",
              }}
            >
              Languages I Work With ({data.profile.languages_used.length})
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {data.profile.languages_used.slice(0, 15).map((lang, idx) => (
                <span
                  key={idx}
                  style={{
                    padding: "0.25rem 0.75rem",
                    backgroundColor: "var(--neutral-200)",
                    borderRadius: "16px",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                  }}
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* Recent Repositories Preview */}
          <div>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                marginBottom: "1rem",
              }}
            >
              Latest Repositories
            </h3>
            <Grid columns="2" mobileColumns="1" gap="12">
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
                    },
                  }}
                  thumbnail={thumbnail}
                  direction={direction}
                />
              ))}
            </Grid>
          </div>
        </div>
      )}

      {activeTab === "repos" && (
        <div>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            All Repositories ({data.repositories.length})
          </h2>
          <Grid
            columns={columns}
            mobileColumns="1"
            fillWidth
            marginBottom="24"
            gap="12"
          >
            {data.repositories.map((repo) => (
              <Post
                key={repo.id}
                post={{
                  slug: repo.name,
                  metadata: {
                    title: repo.name,
                    description: repo.description || "No description provided.",
                    publishedAt: repo.updated_at,
                    url: repo.html_url,
                    stars: repo.stargazers_count,
                    forks: repo.forks_count,
                    language: repo.language,
                    topics: repo.topics || [],
                  },
                }}
                thumbnail={thumbnail}
                direction={direction}
              />
            ))}
          </Grid>
        </div>
      )}

      {activeTab === "activity" && (
        <div>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            Recent Activity
          </h2>
          <div
            style={{
              display: "grid",
              gap: "0.75rem",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            {data.recent_activity.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
      )}

      {activeTab === "gists" && (
        <div>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            Code Gists ({data.gists.length})
          </h2>
          <Grid columns="3" mobileColumns="1" gap="1">
            {data.gists.map((gist) => (
              <a
                key={gist.id}
                href={gist.html_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <GistCard gist={gist} />
              </a>
            ))}
          </Grid>
        </div>
      )}
    </section>
  );
}
