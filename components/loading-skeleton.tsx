export function LoadingSkeleton() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="rounded-[1.6rem] bg-card p-5 sketch-border">
          <div className="flex justify-between">
            <div className="h-20 w-20 animate-pulse rounded-3xl bg-accent" />
            <div className="h-10 w-24 animate-pulse rounded-2xl bg-accent" />
          </div>
          <div className="mt-6 h-7 w-2/3 animate-pulse rounded-full bg-accent" />
          <div className="mt-3 h-5 w-1/2 animate-pulse rounded-full bg-accent" />
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="h-20 animate-pulse rounded-2xl bg-accent" />
            <div className="h-20 animate-pulse rounded-2xl bg-accent" />
            <div className="h-20 animate-pulse rounded-2xl bg-accent" />
          </div>
        </div>
      ))}
    </div>
  );
}
