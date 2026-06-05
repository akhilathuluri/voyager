export type RankableDeveloper = {
  followers: number;
  publicRepos: number;
  stars: number;
  contributions: number;
};

export function calculateRankScore(developer: RankableDeveloper) {
  return (
    developer.followers * 4 +
    developer.stars * 3 +
    developer.publicRepos * 2 +
    developer.contributions
  );
}

export function estimateContributions(publicRepos: number, followers: number, stars: number) {
  return Math.round(publicRepos * 7 + followers * 0.7 + stars * 0.25);
}
