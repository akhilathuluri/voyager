export type City = {
  name: string;
  country: string;
  lat: number;
  lng: number;
};

const cities: City[] = [
  { name: "Hyderabad", country: "India", lat: 17.385, lng: 78.4867 },
  { name: "Bangalore", country: "India", lat: 12.9716, lng: 77.5946 },
  { name: "London", country: "United Kingdom", lat: 51.5072, lng: -0.1276 },
  { name: "Berlin", country: "Germany", lat: 52.52, lng: 13.405 },
  { name: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503 },
  { name: "New York", country: "United States", lat: 40.7128, lng: -74.006 },
  { name: "San Francisco", country: "United States", lat: 37.7749, lng: -122.4194 },
  { name: "Paris", country: "France", lat: 48.8566, lng: 2.3522 },
  { name: "Singapore", country: "Singapore", lat: 1.3521, lng: 103.8198 },
  { name: "Toronto", country: "Canada", lat: 43.6532, lng: -79.3832 },
];

// Cache for geocoded cities to avoid repeated API calls
const geocodeCache = new Map<string, City>();

/**
 * Geocode a city name using OpenStreetMap Nominatim API
 */
async function geocodeCity(cityName: string): Promise<City | null> {
  const cacheKey = cityName.trim().toLowerCase();
  
  // Check cache first
  if (geocodeCache.has(cacheKey)) {
    return geocodeCache.get(cacheKey)!;
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
        cityName
      )}&format=json&limit=1`,
      {
        headers: {
          "User-Agent": "Voyager-App/1.0",
        },
        next: { revalidate: 60 * 60 * 24 * 7 }, // Cache for 1 week
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    
    if (data && data.length > 0) {
      const result = data[0];
      const city: City = {
        name: cityName.trim(),
        country: result.display_name.split(", ").pop() || "Unknown",
        lat: parseFloat(result.lat),
        lng: parseFloat(result.lon),
      };
      
      // Cache the result
      geocodeCache.set(cacheKey, city);
      
      return city;
    }

    return null;
  } catch (error) {
    console.error(`Geocoding failed for ${cityName}:`, error);
    return null;
  }
}

export function findCitySync(query: string): City {
  const normalized = query.trim().toLowerCase();
  return (
    cities.find((city) => city.name.toLowerCase() === normalized) ??
    cities.find((city) => city.name.toLowerCase().includes(normalized)) ??
    { name: query.trim() || "Hyderabad", country: "Unknown", lat: 20, lng: 0 }
  );
}

export async function findCity(query: string): Promise<City> {
  const normalized = query.trim().toLowerCase();
  
  // First, try to find in hardcoded cities
  const hardcodedCity = 
    cities.find((city) => city.name.toLowerCase() === normalized) ??
    cities.find((city) => city.name.toLowerCase().includes(normalized));
  
  if (hardcodedCity) {
    return hardcodedCity;
  }

  // If not found, try geocoding
  const geocodedCity = await geocodeCity(query);
  
  if (geocodedCity) {
    return geocodedCity;
  }

  // Fallback to default coordinates
  return { name: query.trim() || "Hyderabad", country: "Unknown", lat: 20, lng: 0 };
}

export function getFeaturedCities() {
  return cities.slice(0, 5);
}
