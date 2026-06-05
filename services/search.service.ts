import type { Developer } from "@/services/github.service";
import { findCity, type City } from "@/services/geo.service";

export type DeveloperSearchResult = {
  city: City;
  developers: Developer[];
};

export async function searchDevelopers(cityName: string): Promise<DeveloperSearchResult> {
  const response = await fetch(`/api/search?city=${encodeURIComponent(cityName)}`);

  if (!response.ok) {
    throw new Error("Unable to search developers right now.");
  }

  const data = (await response.json()) as { developers: Developer[] };

  return {
    city: await findCity(cityName),
    developers: data.developers,
  };
}
