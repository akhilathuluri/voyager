import { GitBranch, Layers, Link2, Sparkles, Wand2 } from "lucide-react";
import { HandwrittenHeading } from "@/components/handwritten-heading";
import { SketchCard } from "@/components/sketch-card";
import { SketchButton } from "@/components/sketch-button";

const story = [
  "Akhil wanted a calmer way to discover strong builders beyond familiar tech hubs.",
  "Voyager turns scattered GitHub signals into city-level rankings that are easy to scan.",
  "The product keeps the interface warm, editorial, and useful instead of noisy.",
];

const stack = ["Next.js", "TypeScript", "Tailwind", "Framer Motion", "GitHub API"];

export default function AboutPage() {
  return (
    <div className="px-5 py-20 sm:px-8 lg:px-12">
      <section className="mx-auto max-w-6xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm text-secondary shadow-soft sketch-border">
          <Wand2 size={16} /> Built with a pencil-and-pixel mood
        </span>
        <HandwrittenHeading className="mt-8 text-6xl sm:text-8xl">
          Built by Akhil
        </HandwrittenHeading>
        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-secondary">
          Voyager exists to make developer discovery more local, more human,
          and more beautiful. Search a city, understand the community, and find
          the people building in public.
        </p>
      </section>

      <section className="mx-auto mt-24 max-w-5xl">
        <HandwrittenHeading className="text-5xl sm:text-6xl">
          The story
        </HandwrittenHeading>
        <div className="mt-10 space-y-6">
          {story.map((item, index) => (
            <div key={item} className="grid gap-5 md:grid-cols-[90px_1fr]">
              <div className="font-heading text-6xl text-primary/25">
                0{index + 1}
              </div>
              <SketchCard>
                <p className="text-xl leading-8">{item}</p>
              </SketchCard>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-6xl">
        <HandwrittenHeading className="text-5xl sm:text-6xl">
          Tech stack
        </HandwrittenHeading>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {stack.map((item, index) => (
            <SketchCard key={item} delay={index * 0.06} className="text-center">
              <Layers className="mx-auto mb-5" size={34} />
              <h3 className="text-xl font-bold">{item}</h3>
            </SketchCard>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-5xl rounded-[2rem] bg-card p-8 text-center shadow-soft sketch-border sm:p-12">
        <Sparkles className="mx-auto mb-5 text-primary/40" size={44} />
        <HandwrittenHeading className="text-5xl sm:text-6xl">
          Say hello
        </HandwrittenHeading>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <SketchButton href="https://github.com" target="_blank" variant="secondary">
            <GitBranch size={19} /> GitHub
          </SketchButton>
          <SketchButton href="https://linkedin.com" target="_blank" variant="secondary">
            <Link2 size={19} /> LinkedIn
          </SketchButton>
          <SketchButton href="/" variant="secondary">
            Portfolio
          </SketchButton>
        </div>
      </section>
    </div>
  );
}
