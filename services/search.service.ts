import type { Developer } from "@/services/github.service";
import { findCity, type City } from "@/services/geo.service";

export type DeveloperSearchResult = {
  city: City;
  developers: Developer[];
  totalCount: number;
  hasMore: boolean;
};

export async function searchDevelopers(
  cityName: string,
  page: number = 1,
  perPage: number = 12
): Promise<DeveloperSearchResult> {
  const response = await fetch(
    `/api/search?city=${encodeURIComponent(cityName)}&page=${page}&perPage=${perPage}`
  );

  if (!response.ok) {
    throw new Error("Unable to search developers right now.");
  }

  const data = (await response.json()) as {
    developers: Developer[];
    totalCount: number;
    hasMore: boolean;
  };

  return {
    city: await findCity(cityName),
    developers: data.developers,
    totalCount: data.totalCount,
    hasMore: data.hasMore,
  };
}
