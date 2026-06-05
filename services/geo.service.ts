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

export function findCity(query: string): City {
  const normalized = query.trim().toLowerCase();
  return (
    cities.find((city) => city.name.toLowerCase() === normalized) ??
    cities.find((city) => city.name.toLowerCase().includes(normalized)) ??
    { name: query.trim() || "Hyderabad", country: "Unknown", lat: 20, lng: 0 }
  );
}

export function getFeaturedCities() {
  return cities.slice(0, 5);
}
