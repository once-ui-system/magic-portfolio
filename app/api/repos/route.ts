import { NextResponse } from "next/server";

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      console.error("GITHUB_TOKEN environment variable is not set");
      return NextResponse.json(
        { error: "GitHub token not configured" },
        { status: 500 }
      );
    }

    console.log("Fetching repositories...");

    const listResponse = await fetch(
      "https://api.github.com/user/repos?visibility=all&sort=updated&per_page=100",
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `Bearer ${token}`,
          "User-Agent": "Your-App-Name", // GitHub requires a User-Agent
        },
      }
    );

    if (!listResponse.ok) {
      const errorText = await listResponse.text();
      console.error("GitHub API Error:", listResponse.status, errorText);
      
      if (listResponse.status === 401) {
        return NextResponse.json(
          { error: "GitHub token is invalid or expired" },
          { status: 401 }
        );
      }
      
      if (listResponse.status === 403) {
        return NextResponse.json(
          { error: "GitHub API rate limit exceeded or insufficient permissions" },
          { status: 403 }
        );
      }
      
      throw new Error(`GitHub API responded with ${listResponse.status}: ${errorText}`);
    }

    const reposList = await listResponse.json();
    console.log(`Fetched ${reposList.length} repositories`);

    if (!Array.isArray(reposList)) {
      throw new Error("GitHub API returned unexpected format");
    }

    // Fetch detailed info for each repo to get topics
    const detailedRepos = await Promise.all(
      reposList.map(async (repo: any) => {
        try {
          // Get detailed repo info with topics
          const detailResponse = await fetch(
            `https://api.github.com/repos/${repo.owner.login}/${repo.name}`,
            {
              headers: {
                Accept: "application/vnd.github.mercy-preview+json",
                Authorization: `Bearer ${token}`,
                "User-Agent": "Your-App-Name",
              },
            }
          );

          let detailData = { topics: [] };
          if (detailResponse.ok) {
            detailData = await detailResponse.json();
          } else {
            console.warn(`Failed to fetch details for ${repo.name}`);
          }

          // Get language breakdown
          const langsResponse = await fetch(
            `https://api.github.com/repos/${repo.owner.login}/${repo.name}/languages`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "User-Agent": "Your-App-Name",
              },
            }
          );

          let langsPercentages = [];
          if (langsResponse.ok) {
            const langsData = await langsResponse.json();
            const totalBytes = Object.values(langsData).reduce(
              (sum: number, val: any) => sum + (val as number),
              0
            );

            if (totalBytes > 0) {
              langsPercentages = Object.entries(langsData).map(
                ([lang, bytes]: [string, any]) => ({
                  name: lang,
                  percentage: ((bytes / totalBytes) * 100).toFixed(1),
                })
              );
            }
          }

          return {
            ...repo,
            topics: detailData.topics || [],
            languages: langsPercentages,
          };
        } catch (repoError) {
          console.warn(`Error processing repo ${repo.name}:`, repoError);
          // Return basic repo info if detailed fetch fails
          return {
            ...repo,
            topics: [],
            languages: [],
          };
        }
      })
    );

    console.log(`Successfully processed ${detailedRepos.length} repositories`);
    return NextResponse.json(detailedRepos);
    
  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch repositories" },
      { status: 500 }
    );
  }
}