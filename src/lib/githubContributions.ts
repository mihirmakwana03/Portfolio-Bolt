/** Same source as GitHubHeatmap — cached so Skills + heatmap share one network round-trip. */

export const GITHUB_USERNAME = 'mihirmakwana03';

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubContributionsResult {
  contributions: ContributionDay[];
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
}

const getLevelFromCount = (count: number): 0 | 1 | 2 | 3 | 4 => {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
};

function computeStreaks(days: ContributionDay[]) {
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  const today = new Date().toISOString().split('T')[0];
  const todayIdx = days.findIndex((d) => d.date === today);
  const checkFrom = todayIdx >= 0 ? todayIdx : days.length - 1;

  for (let i = checkFrom; i >= 0; i--) {
    if (days[i].count > 0) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      if (i === checkFrom) {
        currentStreak = 0;
      } else if (currentStreak === 0) {
        currentStreak = tempStreak > 0 ? tempStreak : 0;
      }
      tempStreak = 0;
    }
  }
  if (currentStreak === 0 && tempStreak > 0) currentStreak = tempStreak;

  return { currentStreak, longestStreak };
}

let cached: Promise<GitHubContributionsResult> | null = null;

export function fetchGitHubContributionsLastYear(): Promise<GitHubContributionsResult> {
  if (!cached) {
    cached = (async (): Promise<GitHubContributionsResult> => {
      const res = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
      );
      if (!res.ok) throw new Error('GitHub contributions API error');
      const json = await res.json();

      const contributions: ContributionDay[] = (
        json.contributions as { date: string; count: number }[]
      ).map((d) => ({
        date: d.date,
        count: d.count,
        level: getLevelFromCount(d.count),
      }));

      const totalContributions = contributions.reduce((s, d) => s + d.count, 0);
      const { currentStreak, longestStreak } = computeStreaks(contributions);

      return {
        contributions,
        totalContributions,
        currentStreak,
        longestStreak,
      };
    })().catch((err) => {
      cached = null;
      throw err;
    });
  }

  return cached;
}
