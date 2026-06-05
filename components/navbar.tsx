import Link from "next/link";
import { GitBranch, Map } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/78 px-5 py-4 backdrop-blur-xl sm:px-8 lg:px-12">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-card shadow-soft sketch-border">
            <Map size={24} />
          </span>
          <span className="font-heading text-4xl font-bold leading-none">Voyager</span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link className="hidden rounded-2xl px-4 py-2 font-semibold text-secondary transition hover:text-primary sm:block" href="/">
            Home
          </Link>
          <Link className="hidden rounded-2xl px-4 py-2 font-semibold text-secondary transition hover:text-primary sm:block" href="/search">
            Search
          </Link>
          <Link className="hidden rounded-2xl px-4 py-2 font-semibold text-secondary transition hover:text-primary sm:block" href="/about">
            About
          </Link>
          <a className="hidden rounded-2xl bg-card px-4 py-2 font-semibold shadow-soft sketch-border transition hover:-translate-y-0.5 md:inline-flex md:items-center md:gap-2" href="https://github.com" target="_blank" rel="noreferrer">
            <GitBranch size={18} /> GitHub
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
