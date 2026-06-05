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
      <section className="relative min-h-[calc(100vh-88px)] px-5 py-20 sm:px-8 lg:px-12">
        <DoodleBackground />
        <div className="mx-auto flex max-w-7xl flex-col items-center text-center">
          <span className="mb-8 inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm text-secondary shadow-soft sketch-border">
            <Sparkles size={16} /> Handcrafted GitHub discovery
          </span>
          <HandwrittenHeading className="max-w-5xl text-6xl leading-[0.92] sm:text-8xl lg:text-[8.8rem]">
            Rank the best developers in any city.
          </HandwrittenHeading>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-secondary sm:text-xl">
            Discover the most active GitHub developers around the world using
            followers, repositories, stars and contributions.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <SketchButton href="/search" size="lg">
              Explore Rankings <ArrowDownRight size={20} />
            </SketchButton>
            <SketchButton href="#how-it-works" variant="secondary" size="lg">
              How it Works <span className="font-heading text-2xl">↝</span>
            </SketchButton>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="min-h-[420px]">
            <GlobePanel />
          </div>
          <div>
            <HandwrittenHeading className="text-5xl sm:text-7xl">
              Explore talent worldwide.
            </HandwrittenHeading>
            <p className="mt-6 max-w-xl text-lg leading-8 text-secondary">
              A slow spinning atlas for software communities, marked with the
              cities where builders are shaping the open web.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between gap-6">
            <HandwrittenHeading className="text-5xl sm:text-6xl">
              Why Voyager feels different
            </HandwrittenHeading>
            <GitBranch className="hidden text-primary/30 sm:block" size={54} />
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature, index) => (
              <SketchCard key={feature.title} delay={index * 0.08}>
                <div className="mb-8 h-12 w-12 rounded-2xl bg-accent p-3 sketch-border">
                  <MapPin className="h-full w-full" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight">
                  {feature.title}
                </h3>
                <p className="mt-4 leading-7 text-secondary">{feature.body}</p>
              </SketchCard>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <HandwrittenHeading className="text-center text-5xl sm:text-7xl">
            How rankings work
          </HandwrittenHeading>
          <div className="mt-14 grid gap-6 md:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step} className="relative rounded-[1.5rem] bg-card p-6 sketch-border">
                <span className="font-heading text-5xl text-primary/30">
                  0{index + 1}
                </span>
                <h3 className="mt-5 text-xl font-bold">{step}</h3>
                {index < steps.length - 1 ? (
                  <span className="absolute -right-5 top-1/2 hidden font-heading text-5xl text-primary/40 md:block">
                    ↝
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center rounded-[2rem] bg-card px-6 py-16 text-center shadow-soft sketch-border">
          <HandwrittenHeading className="text-5xl sm:text-7xl">
            Ready to discover developers?
          </HandwrittenHeading>
          <Link href="/search" className="mt-9">
            <SketchButton as="span" size="lg">
              Start Exploring <ArrowDownRight size={20} />
            </SketchButton>
          </Link>
        </div>
      </section>
    </div>
  );
}
