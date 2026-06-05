"use client";

import { motion } from "framer-motion";
import { Braces, Code2, GitBranch, Sparkle, Terminal } from "lucide-react";

const doodles = [
  { Icon: Sparkle, x: "12%", y: "24%", delay: 0 },
  { Icon: GitBranch, x: "78%", y: "18%", delay: 0.4 },
  { Icon: Braces, x: "22%", y: "74%", delay: 0.7 },
  { Icon: Terminal, x: "68%", y: "68%", delay: 1 },
  { Icon: Code2, x: "88%", y: "52%", delay: 1.3 },
];

export function DoodleBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {doodles.map(({ Icon, x, y, delay }, index) => (
        <motion.div
          key={index}
          animate={{ y: [0, -18, 0], rotate: [-5, 8, -5] }}
          transition={{ duration: 7, delay, repeat: Infinity, ease: "easeInOut" }}
          className="absolute text-primary/12"
          style={{ left: x, top: y }}
        >
          <Icon size={44} strokeWidth={1.6} />
        </motion.div>
      ))}
      <svg className="absolute bottom-24 left-[8%] h-24 w-48 text-primary/10" viewBox="0 0 220 90" fill="none">
        <path d="M7 56C47 6 91 91 134 41C154 18 178 18 213 34" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      </svg>
    </div>
  );
}
