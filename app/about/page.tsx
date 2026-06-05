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
    <div className="px-5 py-12 sm:py-20 sm:px-8 lg:px-12">
      <section className="mx-auto max-w-6xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-card px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-secondary shadow-soft sketch-border">
          <Wand2 size={14} className="sm:hidden" />
          <Wand2 size={16} className="hidden sm:block" />
          Built with a pencil-and-pixel mood
        </span>
        <HandwrittenHeading className="mt-6 sm:mt-8 text-5xl sm:text-6xl lg:text-8xl">
          Built by Akhil
        </HandwrittenHeading>
        <p className="mx-auto mt-6 sm:mt-8 max-w-3xl text-base sm:text-lg leading-7 sm:leading-8 text-secondary px-4 sm:px-0">
          Voyager exists to make developer discovery more local, more human,
          and more beautiful. Search a city, understand the community, and find
          the people building in public.
        </p>
      </section>

      <section className="mx-auto mt-16 sm:mt-24 max-w-5xl">
        <HandwrittenHeading className="text-4xl sm:text-5xl lg:text-6xl">
          The story
        </HandwrittenHeading>
        <div className="mt-8 sm:mt-10 space-y-5 sm:space-y-6">
          {story.map((item, index) => (
            <div key={item} className="grid gap-4 sm:gap-5 md:grid-cols-[90px_1fr]">
              <div className="font-heading text-5xl sm:text-6xl text-primary/25">
                0{index + 1}
              </div>
              <SketchCard>
                <p className="text-base sm:text-lg lg:text-xl leading-7 sm:leading-8">{item}</p>
              </SketchCard>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 sm:mt-24 max-w-6xl">
        <HandwrittenHeading className="text-4xl sm:text-5xl lg:text-6xl">
          Tech stack
        </HandwrittenHeading>
        <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {stack.map((item, index) => (
            <SketchCard key={item} delay={index * 0.06} className="text-center">
              <Layers className="mx-auto mb-4 sm:mb-5" size={28} />
              <h3 className="text-base sm:text-lg lg:text-xl font-bold">{item}</h3>
            </SketchCard>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 sm:mt-24 max-w-5xl rounded-[2rem] bg-card p-6 sm:p-8 lg:p-12 text-center shadow-soft sketch-border">
        <Sparkles className="mx-auto mb-4 sm:mb-5 text-primary/40" size={36} />
        <HandwrittenHeading className="text-4xl sm:text-5xl lg:text-6xl">
          Say hello
        </HandwrittenHeading>
        <div className="mt-6 sm:mt-8 flex flex-col justify-center gap-3 sm:gap-4">
          <SketchButton href="https://github.com/akhilathuluri/voyager" target="_blank" variant="secondary" className="w-full sm:w-auto">
            <GitBranch size={18} className="sm:hidden" />
            <GitBranch size={19} className="hidden sm:block" />
            GitHub
          </SketchButton>
          <SketchButton href="https://linkedin.com/in/athuluriakhil" target="_blank" variant="secondary" className="w-full sm:w-auto">
            <Link2 size={18} className="sm:hidden" />
            <Link2 size={19} className="hidden sm:block" />
            LinkedIn
          </SketchButton>
          <SketchButton href="/" variant="secondary" className="w-full sm:w-auto">
            Portfolio
          </SketchButton>
        </div>
      </section>
    </div>
  );
}
