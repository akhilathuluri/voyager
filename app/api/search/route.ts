import { NextResponse } from "next/server";
import { searchGitHubDevelopers } from "@/services/github.service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city")?.trim();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("perPage") || "12", 10);

  if (!city) {
    return NextResponse.json({ 
      developers: [],
      totalCount: 0,
      hasMore: false,
    });
  }

  try {
    const result = await searchGitHubDevelopers(city, page, perPage);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        developers: [],
        totalCount: 0,
        hasMore: false,
        error: error instanceof Error ? error.message : "GitHub search failed",
      },
      { status: 502 }
    );
  }
}
