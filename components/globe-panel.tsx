"use client";

import dynamic from "next/dynamic";

const AnimatedGlobe = dynamic(() => import("@/components/animated-globe"), {
  ssr: false,
  loading: () => <div className="h-[420px] rounded-[2rem] bg-card sketch-border sm:h-[520px]" />,
});

export function GlobePanel() {
  return <AnimatedGlobe />;
}
