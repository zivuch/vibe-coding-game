'use client';

import { GameStats } from '@/types/game';
import { generateShareText, copyToClipboard } from '@/lib/share';
import { LetterState } from '@/types/game';
import { useState } from 'react';

type StatsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  stats: GameStats;
  guesses: string[];
  evaluations: LetterState[][];
  gameWon: boolean;
  gameLost: boolean;
};

export default function StatsModal({
  isOpen,
  onClose,
  stats,
  guesses,
  evaluations,
  gameWon,
  gameLost,
}: StatsModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const winPercentage = stats.gamesPlayed > 0
    ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
    : 0;

  const maxGuessCount = Math.max(
    ...Object.values(stats.guessDistribution)
  );

  const handleShare = async () => {
    if (!gameWon && !gameLost) return;

    const shareText = generateShareText(guesses, evaluations, gameWon);
    const success = await copyToClipboard(shareText);

    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-dev-surface rounded-lg p-6 max-w-md w-full border border-gray-300 dark:border-dev-border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Statistics</h2>
          <button
            onClick={onClose}
            className="text-2xl hover:opacity-70 transition-opacity"
          >
            ✕
          </button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold">{stats.gamesPlayed}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Played</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{winPercentage}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Win %</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{stats.currentStreak}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Current Streak</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{stats.maxStreak}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Max Streak</div>
          </div>
        </div>

        {/* Guess Distribution */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Guess Distribution</h3>
          <div className="space-y-1">
            {Object.entries(stats.guessDistribution).map(([guess, count]) => (
              <div key={guess} className="flex items-center gap-2">
                <div className="w-4 text-right text-sm">{guess}</div>
                <div className="flex-1 bg-gray-200 dark:bg-dev-bg rounded overflow-hidden">
                  <div
                    className="bg-dev-accent text-white text-right pr-2 py-1 text-sm font-semibold transition-all duration-500"
                    style={{
                      width: maxGuessCount > 0
                        ? `${Math.max((count / maxGuessCount) * 100, count > 0 ? 7 : 0)}%`
                        : '0%',
                    }}
                  >
                    {count > 0 ? count : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Share Button */}
        {(gameWon || gameLost) && (
          <button
            onClick={handleShare}
            className="w-full bg-dev-accent hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded transition-colors"
          >
            {copied ? '✓ Copied to Clipboard!' : 'Share Results'}
          </button>
        )}
      </div>
    </div>
  );
}
