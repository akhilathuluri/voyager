export function RankingBadge({ rank, score }: { rank: number; score: number }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-2xl bg-accent px-3 py-2 text-sm font-bold sketch-border">
      <span className="font-heading text-2xl leading-none">#{rank}</span>
      <span>{score.toLocaleString()} pts</span>
    </div>
  );
}
