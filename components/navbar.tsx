"use client";

import Link from "next/link";
import { GitBranch, Map, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/78 px-5 py-4 backdrop-blur-xl sm:px-8 lg:px-12">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <span className="grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-2xl bg-card shadow-soft sketch-border">
            <Map size={20} className="sm:hidden" />
            <Map size={24} className="hidden sm:block" />
          </span>
          <span className="font-heading text-3xl sm:text-4xl font-bold leading-none">Voyager</span>
        </Link>
        
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Desktop Navigation */}
          <Link className="hidden rounded-2xl px-4 py-2 font-semibold text-secondary transition hover:text-primary sm:block" href="/">
            Home
          </Link>
          <Link className="hidden rounded-2xl px-4 py-2 font-semibold text-secondary transition hover:text-primary sm:block" href="/search">
            Search
          </Link>
          <Link className="hidden rounded-2xl px-4 py-2 font-semibold text-secondary transition hover:text-primary sm:block" href="/about">
            About
          </Link>
          <a className="hidden rounded-2xl bg-card px-4 py-2 font-semibold shadow-soft sketch-border transition hover:-translate-y-0.5 md:inline-flex md:items-center md:gap-2" href="https://github.com/akhilathuluri/voyager" target="_blank" rel="noreferrer">
            <GitBranch size={18} /> GitHub
          </a>
          
          <ThemeToggle />
          
          {/* Mobile Menu Button */}
          <button
            className="grid h-10 w-10 place-items-center rounded-2xl bg-card shadow-soft sketch-border transition hover:-translate-y-0.5 sm:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden sm:hidden"
          >
            <div className="space-y-2 py-4">
              <Link
                className="block rounded-2xl bg-card px-4 py-3 font-semibold shadow-soft sketch-border transition hover:bg-accent"
                href="/"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                className="block rounded-2xl bg-card px-4 py-3 font-semibold shadow-soft sketch-border transition hover:bg-accent"
                href="/search"
                onClick={() => setMobileMenuOpen(false)}
              >
                Search
              </Link>
              <Link
                className="block rounded-2xl bg-card px-4 py-3 font-semibold shadow-soft sketch-border transition hover:bg-accent"
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <a
                className="flex items-center gap-2 rounded-2xl bg-card px-4 py-3 font-semibold shadow-soft sketch-border transition hover:bg-accent"
                href="https://github.com/akhilathuluri/voyager"
                target="_blank"
                rel="noreferrer"
              >
                <GitBranch size={18} /> GitHub
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
