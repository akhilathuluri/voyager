"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      aria-label="Toggle theme"
      className="grid h-11 w-11 place-items-center rounded-2xl bg-card shadow-soft sketch-border transition hover:-translate-y-0.5"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      type="button"
    >
      <Sun className="hidden dark:block" size={19} />
      <Moon className="dark:hidden" size={19} />
    </button>
  );
}
