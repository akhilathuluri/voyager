"use client";

import { Search } from "lucide-react";
import { motion } from "framer-motion";

export function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <motion.label
      animate={{ scale: value ? 1.02 : 1 }}
      className="mx-auto flex w-full max-w-2xl items-center gap-4 rounded-[1.6rem] bg-card px-5 py-4 shadow-soft sketch-border focus-within:shadow-hand"
    >
      <Search className="text-secondary" size={23} />
      <input
        aria-label="Search a city"
        className="w-full bg-transparent text-lg font-semibold outline-none placeholder:text-secondary/60"
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search a city..."
        value={value}
      />
    </motion.label>
  );
}
