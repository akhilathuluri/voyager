"use client";

import { useEffect, useMemo, useRef } from "react";
import Globe from "react-globe.gl";
import { useTheme } from "next-themes";
import type { City } from "@/services/geo.service";

type GlobeControls = {
  autoRotate: boolean;
  autoRotateSpeed: number;
};

type GlobeRef = {
  controls: () => GlobeControls;
  pointOfView: (
    view: { lat: number; lng: number; altitude: number },
    duration?: number
  ) => void;
};

const defaultPoints = [
  { name: "Hyderabad", lat: 17.385, lng: 78.4867, size: 0.42 },
  { name: "Bangalore", lat: 12.9716, lng: 77.5946, size: 0.38 },
  { name: "London", lat: 51.5072, lng: -0.1276, size: 0.44 },
  { name: "Berlin", lat: 52.52, lng: 13.405, size: 0.36 },
  { name: "Tokyo", lat: 35.6762, lng: 139.6503, size: 0.45 },
  { name: "San Francisco", lat: 37.7749, lng: -122.4194, size: 0.4 },
];

export default function AnimatedGlobe({ city }: { city?: City }) {
  const globeRef = useRef<GlobeRef | undefined>(undefined);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const points = useMemo(
    () =>
      city
        ? [
            ...defaultPoints,
            { name: city.name, lat: city.lat, lng: city.lng, size: 0.72 },
          ]
        : defaultPoints,
    [city]
  );

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.55;
  }, []);

  useEffect(() => {
    if (!city || !globeRef.current) return;
    globeRef.current.pointOfView(
      { lat: city.lat, lng: city.lng, altitude: 1.45 },
      1500
    );
  }, [city]);

  return (
    <div className="relative h-[320px] sm:h-[420px] lg:h-[520px] overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] bg-card shadow-soft sketch-border">
      <Globe
        ref={globeRef as never}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl={isDark ? "//unpkg.com/three-globe/example/img/earth-night.jpg" : "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"}
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        height={520}
        labelsData={city ? [city] : []}
        labelLat={(d) => (d as City).lat}
        labelLng={(d) => (d as City).lng}
        labelText={(d) => (d as City).name}
        labelSize={1.4}
        labelDotRadius={0.45}
        labelColor={() => (isDark ? "#F5F5F5" : "#111111")}
        labelResolution={3}
        pointAltitude={(d) => (d as { size: number }).size * 0.03}
        pointColor={() => (isDark ? "#F7F2EA" : "#111111")}
        pointLat={(d) => (d as { lat: number }).lat}
        pointLng={(d) => (d as { lng: number }).lng}
        pointRadius={(d) => (d as { size: number }).size}
        pointsData={points}
        ringsData={city ? [city] : []}
        ringLat={(d) => (d as City).lat}
        ringLng={(d) => (d as City).lng}
        ringColor={() => (isDark ? "rgba(245,245,245,.35)" : "rgba(17,17,17,.28)")}
        ringMaxRadius={5}
        ringPropagationSpeed={2}
        ringRepeatPeriod={950}
        width={900}
      />
      <div className="pointer-events-none absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6 rounded-xl sm:rounded-2xl bg-background/72 px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold backdrop-blur sketch-border">
        {city ? `${city.name}, ${city.country}` : "Slowly orbiting the developer map"}
      </div>
    </div>
  );
}
