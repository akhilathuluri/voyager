import Link from "next/link";
import { cn } from "@/lib/utils";

type SketchButtonProps = {
  children: React.ReactNode;
  href?: string;
  target?: string;
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
  as?: "button" | "span";
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

export function SketchButton({
  children,
  href,
  target,
  variant = "primary",
  size = "md",
  as = "button",
  type = "button",
  onClick,
  className,
  disabled = false,
}: SketchButtonProps) {
  const classes = cn(
    "group inline-flex items-center justify-center gap-2 rounded-2xl font-bold transition duration-300 sketch-border active:scale-95",
    "hover:-translate-y-1 hover:rotate-[-1deg] hover:shadow-hand",
    size === "lg" ? "px-7 py-4 text-lg" : "px-5 py-3",
    variant === "primary"
      ? "bg-primary text-background shadow-hand"
      : "bg-card text-primary shadow-soft",
    disabled && "opacity-50 cursor-not-allowed hover:translate-y-0 hover:rotate-0 hover:shadow-soft",
    className
  );

  if (href && !disabled) {
    return (
      <Link className={classes} href={href} target={target}>
        {children}
      </Link>
    );
  }

  if (as === "span") {
    return <span className={classes}>{children}</span>;
  }

  return (
    <button className={classes} onClick={onClick} type={type} disabled={disabled}>
      {children}
    </button>
  );
}
