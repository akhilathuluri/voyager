import Image from "next/image";
import { ExternalLink, GitFork, Star, Users } from "lucide-react";
import type { Developer } from "@/services/github.service";
import { RankingBadge } from "@/components/ranking-badge";

export function DeveloperCard({
  developer,
  rank,
}: {
  developer: Developer;
  rank: number;
}) {
  return (
    <a
      href={developer.url}
      target="_blank"
      rel="noreferrer"
      className="group block rounded-[1.6rem] bg-card p-5 shadow-soft sketch-border transition duration-300 hover:-translate-y-2 hover:rotate-1 hover:shadow-hand"
    >
      <div className="flex items-start justify-between gap-4">
        <Image
          src={developer.avatarUrl}
          alt={`${developer.username} avatar`}
          width={76}
          height={76}
          className="rounded-3xl sketch-border"
        />
        <RankingBadge rank={rank} score={developer.score} />
      </div>
      <div className="mt-5">
        <h3 className="text-2xl font-bold tracking-tight">{developer.name}</h3>
        <p className="text-secondary">@{developer.username}</p>
        <p className="mt-3 line-clamp-1 text-sm text-secondary">
          {developer.location}
        </p>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
        <Stat icon={<Users size={16} />} label="Followers" value={developer.followers} />
        <Stat icon={<GitFork size={16} />} label="Repos" value={developer.publicRepos} />
        <Stat icon={<Star size={16} />} label="Stars" value={developer.stars} />
      </div>
      <div className="mt-5 flex items-center justify-between text-sm font-bold">
        <span>{developer.contributions.toLocaleString()} contribution estimate</span>
        <ExternalLink className="transition group-hover:translate-x-1" size={17} />
      </div>
    </a>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl bg-accent/65 p-3">
      <div className="mb-2 text-primary/70">{icon}</div>
      <div className="font-bold">{value.toLocaleString()}</div>
      <div className="text-xs text-secondary">{label}</div>
    </div>
  );
}
