import { NextResponse } from "next/server";

interface GitHubEvent {
  id: string;
  type: string;
  actor: {
    login: string;
    avatar_url: string;
  };
  repo: {
    name: string;
    url: string;
  };
  payload: any;
  public: boolean;
  created_at: string;
}

interface GitHubStats {
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  total_private_repos?: number;
  owned_private_repos?: number;
}

interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN;
    const username = process.env.GITHUB_USERNAME; // Add your username to env

    if (!token || !username) {
      throw new Error("GitHub token or username not configured");
    }

    // Fetch user profile stats
    const userResponse = await fetch(`https://api.github.com/user`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!userResponse.ok) {
      throw new Error("Failed to fetch user profile");
    }

    const userStats: GitHubStats = await userResponse.json();

    // Fetch repositories (existing logic)
    const listResponse = await fetch(
      "https://api.github.com/user/repos?visibility=all&sort=updated&per_page=100",
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!listResponse.ok) {
      throw new Error("Failed to fetch repositories list");
    }

    const reposList = await listResponse.json();

    // Fetch recent activity/events
    const eventsResponse = await fetch(
      `https://api.github.com/users/${username}/events/public?per_page=30`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    let recentActivity: GitHubEvent[] = [];
    if (eventsResponse.ok) {
      recentActivity = await eventsResponse.json();
    }

    // Fetch starred repositories
    const starredResponse = await fetch(
      `https://api.github.com/user/starred?per_page=20&sort=created`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    let starredRepos = [];
    if (starredResponse.ok) {
      starredRepos = await starredResponse.json();
    }

    // Fetch user's gists
    const gistsResponse = await fetch(
      `https://api.github.com/users/${username}/gists?per_page=20`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    let gists = [];
    if (gistsResponse.ok) {
      gists = await gistsResponse.json();
    }

    // Process repositories with detailed info (existing logic)
    const detailedRepos = await Promise.all(
      reposList.slice(0, 50).map(async (repo: any) => {
        const detailResponse = await fetch(
          `https://api.github.com/repos/${repo.owner.login}/${repo.name}`,
          {
            headers: {
              Accept: "application/vnd.github.mercy-preview+json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const detailData = await detailResponse.json();

        // Language breakdown
        const langsResponse = await fetch(
          `https://api.github.com/repos/${repo.owner.login}/${repo.name}/languages`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const langsData = await langsResponse.json();

        const totalBytes = Object.values(langsData).reduce(
          (sum: number, val: any) => sum + (val as number),
          0
        );

        const langsPercentages = Object.entries(langsData).map(
          ([lang, bytes]: [string, any]) => ({
            name: lang,
            percentage:
              totalBytes > 0 ? ((bytes / totalBytes) * 100).toFixed(1) : "0",
          })
        );

        // Fetch recent commits
        const commitsResponse = await fetch(
          `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits?per_page=5`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        let recentCommits = [];
        if (commitsResponse.ok) {
          recentCommits = await commitsResponse.json();
        }

        return {
          ...repo,
          topics: detailData.topics || [],
          languages: langsPercentages,
          recent_commits: recentCommits.slice(0, 3), // Latest 3 commits
        };
      })
    );

    // Calculate some stats
    const totalStars = detailedRepos.reduce(
      (sum, repo) => sum + repo.stargazers_count,
      0
    );
    const totalForks = detailedRepos.reduce(
      (sum, repo) => sum + repo.forks_count,
      0
    );
    const languagesUsed = [
      ...new Set(
        detailedRepos.flatMap((repo) =>
          repo.languages.map((lang: any) => lang.name)
        )
      ),
    ];

    // Process recent activity for better display
    const processedActivity = recentActivity
      .slice(0, 15)
      .map((event: GitHubEvent) => {
        let activityType = "";
        let description = "";

        switch (event.type) {
          case "PushEvent":
            const commits = event.payload.commits?.length || 0;
            activityType = "Push";
            description = `Pushed ${commits} commit${
              commits !== 1 ? "s" : ""
            } to ${event.repo.name}`;
            break;
          case "CreateEvent":
            activityType = "Create";
            description = `Created ${event.payload.ref_type} in ${event.repo.name}`;
            break;
          case "WatchEvent":
            activityType = "Star";
            description = `Starred ${event.repo.name}`;
            break;
          case "ForkEvent":
            activityType = "Fork";
            description = `Forked ${event.repo.name}`;
            break;
          case "IssuesEvent":
            activityType = "Issue";
            description = `${event.payload.action} issue in ${event.repo.name}`;
            break;
          case "PullRequestEvent":
            activityType = "PR";
            description = `${event.payload.action} pull request in ${event.repo.name}`;
            break;
          default:
            activityType = event.type.replace("Event", "");
            description = `${activityType} in ${event.repo.name}`;
        }

        return {
          id: event.id,
          type: activityType,
          description,
          repo: event.repo.name,
          date: event.created_at,
          url: `https://github.com/${event.repo.name}`,
        };
      });

    return NextResponse.json({
      profile: {
        username,
        public_repos: userStats.public_repos,
        public_gists: userStats.public_gists,
        followers: userStats.followers,
        following: userStats.following,
        created_at: userStats.created_at,
        total_stars: totalStars,
        total_forks: totalForks,
        languages_used: languagesUsed,
      },
      repositories: detailedRepos,
      recent_activity: processedActivity,
      starred_repos: starredRepos.slice(0, 10),
      gists: gists.slice(0, 10).map((gist: any) => ({
        id: gist.id,
        description: gist.description,
        html_url: gist.html_url,
        created_at: gist.created_at,
        files: Object.keys(gist.files),
        public: gist.public,
      })),
    });
  } catch (error: any) {
    console.error("GitHub API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
