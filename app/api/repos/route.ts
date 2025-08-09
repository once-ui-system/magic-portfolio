import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const response = await fetch(
      `https://api.github.com/users/Awii21/repos?sort=updated&per_page=20`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch repositories");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
