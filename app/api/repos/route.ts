import { NextResponse } from "next/server";

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN; // Store your token in environment variables

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

    // Fetch detailed info for each repo to get topics
    const detailedRepos = await Promise.all(
      reposList.map(async (repo: any) => {
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
        return { ...repo, topics: detailData.topics || [] };
      })
    );

    return NextResponse.json(detailedRepos);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
