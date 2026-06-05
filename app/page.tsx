import Link from "next/link";
import { ArrowDownRight, GitBranch, MapPin, Sparkles } from "lucide-react";
import { DoodleBackground } from "@/components/doodle-background";
import { GlobePanel } from "@/components/globe-panel";
import { HandwrittenHeading } from "@/components/handwritten-heading";
import { SketchButton } from "@/components/sketch-button";
import { SketchCard } from "@/components/sketch-card";

const features = [
  {
    title: "Location Based Discovery",
    body: "Search any city and surface the builders already active there.",
  },
  {
    title: "Developer Ranking",
    body: "Blend social, repository, stars, and contribution signals into one useful score.",
  },
  {
    title: "GitHub Insights",
    body: "Understand each profile at a glance without opening twelve tabs.",
  },
  {
    title: "Beautiful Profiles",
    body: "Editorial cards, crisp stats, and tiny details that make scanning feel good.",
  },
];

const steps = [
  "Find developers",
  "Collect GitHub data",
  "Calculate scores",
  "Generate rankings",
];

export default function Home() {
  return (
    <div className="overflow-hidden">
      <section className="relative min-h-[calc(100vh-88px)] px-5 py-12 sm:py-20 sm:px-8 lg:px-12">
        <DoodleBackground />
        <div className="mx-auto flex max-w-7xl flex-col items-center text-center">
          <span className="mb-6 sm:mb-8 inline-flex items-center gap-2 rounded-full bg-card px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-secondary shadow-soft sketch-border">
            <Sparkles size={14} className="sm:hidden" />
            <Sparkles size={16} className="hidden sm:block" />
            Handcrafted GitHub discovery
          </span>
          <HandwrittenHeading className="max-w-5xl text-5xl leading-[0.95] sm:text-6xl sm:leading-[0.92] lg:text-8xl xl:text-[8.8rem]">
            Rank the best developers in any city.
          </HandwrittenHeading>
          <p className="mt-6 sm:mt-8 max-w-3xl text-base sm:text-lg leading-7 sm:leading-8 text-secondary px-4 sm:px-0 sm:text-xl">
            Discover the most active GitHub developers around the world using
            followers, repositories, stars and contributions.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col w-full sm:w-auto items-center gap-3 sm:gap-4 px-4 sm:px-0 sm:flex-row">
            <SketchButton href="/search" size="lg" className="w-full sm:w-auto">
              Explore Rankings <ArrowDownRight size={18} className="sm:hidden" /><ArrowDownRight size={20} className="hidden sm:block" />
            </SketchButton>
            <SketchButton href="#how-it-works" variant="secondary" size="lg" className="w-full sm:w-auto">
              How it Works <span className="font-heading text-xl sm:text-2xl">↝</span>
            </SketchButton>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:py-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="min-h-[320px] sm:min-h-[420px] order-2 lg:order-1">
            <GlobePanel />
          </div>
          <div className="order-1 lg:order-2">
            <HandwrittenHeading className="text-4xl sm:text-5xl lg:text-7xl">
              Explore talent worldwide.
            </HandwrittenHeading>
            <p className="mt-4 sm:mt-6 max-w-xl text-base sm:text-lg leading-7 sm:leading-8 text-secondary">
              A slow spinning atlas for software communities, marked with the
              cities where builders are shaping the open web.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 sm:mb-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-6">
            <HandwrittenHeading className="text-4xl sm:text-5xl lg:text-6xl">
              Why Voyager feels different
            </HandwrittenHeading>
            <GitBranch className="hidden text-primary/30 sm:block" size={54} />
          </div>
          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {features.map((feature, index) => (
              <SketchCard key={feature.title} delay={index * 0.08}>
                <div className="mb-6 sm:mb-8 h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-accent p-2.5 sm:p-3 sketch-border">
                  <MapPin className="h-full w-full" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                  {feature.title}
                </h3>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-6 sm:leading-7 text-secondary">{feature.body}</p>
              </SketchCard>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="px-5 py-12 sm:py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <HandwrittenHeading className="text-center text-4xl sm:text-5xl lg:text-7xl">
            How rankings work
          </HandwrittenHeading>
          <div className="mt-10 sm:mt-14 grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step} className="relative rounded-[1.5rem] bg-card p-4 sm:p-6 sketch-border">
                <span className="font-heading text-4xl sm:text-5xl text-primary/30">
                  0{index + 1}
                </span>
                <h3 className="mt-3 sm:mt-5 text-base sm:text-xl font-bold">{step}</h3>
                {index < steps.length - 1 ? (
                  <span className="absolute -right-3 sm:-right-5 top-1/2 hidden font-heading text-3xl sm:text-5xl text-primary/40 md:block">
                    ↝
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:py-24 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center rounded-[2rem] bg-card px-5 py-12 sm:px-6 sm:py-16 text-center shadow-soft sketch-border">
          <HandwrittenHeading className="text-4xl sm:text-5xl lg:text-7xl">
            Ready to discover developers?
          </HandwrittenHeading>
          <Link href="/search" className="mt-7 sm:mt-9 w-full sm:w-auto">
            <SketchButton as="span" size="lg" className="w-full sm:w-auto">
              Start Exploring <ArrowDownRight size={18} className="sm:hidden" /><ArrowDownRight size={20} className="hidden sm:block" />
            </SketchButton>
          </Link>
        </div>
      </section>
    </div>
  );
}
