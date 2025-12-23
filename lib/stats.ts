import { GameStats } from '@/types/game';

const STATS_KEY = 'devWordle_stats';

export const DEFAULT_STATS: GameStats = {
  gamesPlayed: 0,
  gamesWon: 0,
  currentStreak: 0,
  maxStreak: 0,
  guessDistribution: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  },
  lastPlayedDate: '',
};

export function loadStats(): GameStats {
  if (typeof window === 'undefined') return DEFAULT_STATS;

  try {
    const stored = localStorage.getItem(STATS_KEY);
    if (!stored) return DEFAULT_STATS;

    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading stats:', error);
    return DEFAULT_STATS;
  }
}

export function saveStats(stats: GameStats): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error('Error saving stats:', error);
  }
}

export function updateStats(
  stats: GameStats,
  won: boolean,
  guesses: number
): GameStats {
  const today = new Date().toDateString();
  const lastPlayed = new Date(stats.lastPlayedDate).toDateString();

  // Check if this is a new game (different day or first time)
  const isNewGame = !stats.lastPlayedDate || today !== lastPlayed;

  if (!isNewGame) {
    // Already played today, don't update
    return stats;
  }

  const newStats = { ...stats };

  newStats.gamesPlayed++;
  newStats.lastPlayedDate = today;

  if (won) {
    newStats.gamesWon++;

    // Update guess distribution
    if (guesses >= 1 && guesses <= 6) {
      newStats.guessDistribution[guesses as keyof typeof newStats.guessDistribution]++;
    }

    // Update streaks
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    if (lastPlayed === yesterdayStr) {
      // Continuing streak
      newStats.currentStreak++;
    } else {
      // New streak
      newStats.currentStreak = 1;
    }

    newStats.maxStreak = Math.max(newStats.maxStreak, newStats.currentStreak);
  } else {
    // Lost - reset streak
    newStats.currentStreak = 0;
  }

  return newStats;
}

export function resetStats(): void {
  saveStats(DEFAULT_STATS);
}
