"use client";

import dynamic from "next/dynamic";

const AnimatedGlobe = dynamic(() => import("@/components/animated-globe"), {
  ssr: false,
  loading: () => <div className="h-[320px] sm:h-[420px] lg:h-[520px] rounded-[1.5rem] sm:rounded-[2rem] bg-card sketch-border" />,
});

export function GlobePanel() {
  return <AnimatedGlobe />;
}
