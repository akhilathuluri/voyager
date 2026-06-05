import { calculateRankScore, estimateContributions } from "@/services/ranking.service";

export type Developer = {
  id: number;
  avatarUrl: string;
  name: string;
  username: string;
  location: string;
  followers: number;
  publicRepos: number;
  stars: number;
  contributions: number;
  score: number;
  url: string;
};

type GitHubUserSearchItem = {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
};

type GitHubUser = {
  name: string | null;
  login: string;
  location: string | null;
  followers: number;
  public_repos: number;
  avatar_url: string;
  html_url: string;
  id: number;
};

type GitHubRepo = {
  stargazers_count: number;
};

const headers: HeadersInit = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
};

if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
}

async function githubFetch<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers,
    next: { revalidate: 60 * 15 },
  });

  if (!response.ok) {
    throw new Error(`GitHub request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function searchGitHubDevelopers(city: string): Promise<Developer[]> {
  const search = await githubFetch<{ items: GitHubUserSearchItem[] }>(
    `https://api.github.com/search/users?q=${encodeURIComponent(
      `location:${city}`
    )}&per_page=8`
  );

  const developers = await Promise.all(
    search.items.map(async (item) => {
      const [user, repos] = await Promise.all([
        githubFetch<GitHubUser>(`https://api.github.com/users/${item.login}`),
        githubFetch<GitHubRepo[]>(
          `https://api.github.com/users/${item.login}/repos?per_page=30&sort=updated`
        ),
      ]);

      const stars = repos.reduce((total, repo) => total + repo.stargazers_count, 0);
      const contributions = estimateContributions(
        user.public_repos,
        user.followers,
        stars
      );
      const score = calculateRankScore({
        followers: user.followers,
        publicRepos: user.public_repos,
        stars,
        contributions,
      });

      return {
        id: user.id,
        avatarUrl: user.avatar_url,
        name: user.name ?? user.login,
        username: user.login,
        location: user.location ?? city,
        followers: user.followers,
        publicRepos: user.public_repos,
        stars,
        contributions,
        score,
        url: user.html_url,
      };
    })
  );

  return developers.sort((a, b) => b.score - a.score);
}
