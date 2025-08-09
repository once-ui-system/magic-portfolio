import { NextResponse } from "next/server";

export async function GET() {
  try {
    const listResponse = await fetch(
      `https://api.github.com/users/Awii21/repos?sort=updated&per_page=20`,
      {
        headers: {
          Accept: "application/vnd.github+json",
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
              Accept: "application/vnd.github.mercy-preview+json", // needed for topics
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
