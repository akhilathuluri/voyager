import { cn } from "@/lib/utils";

export function HandwrittenHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1 className={cn("font-heading font-bold tracking-normal text-primary", className)}>
      {children}
    </h1>
  );
}
