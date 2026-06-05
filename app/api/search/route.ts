import { NextResponse } from "next/server";
import { searchGitHubDevelopers } from "@/services/github.service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city")?.trim();

  if (!city) {
    return NextResponse.json({ developers: [] });
  }

  try {
    const developers = await searchGitHubDevelopers(city);
    return NextResponse.json({ developers });
  } catch (error) {
    return NextResponse.json(
      {
        developers: [],
        error: error instanceof Error ? error.message : "GitHub search failed",
      },
      { status: 502 }
    );
  }
}
