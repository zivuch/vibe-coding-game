'use client';

import { useState, useEffect } from 'react';
import Grid from './Grid';
import Keyboard from './Keyboard';
import Header from './Header';
import StatsModal from './StatsModal';
import HelpModal from './HelpModal';
import SettingsModal from './SettingsModal';
import { useGameState } from '@/lib/hooks/useGameState';
import { useKeyboard } from '@/lib/hooks/useKeyboard';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { getKeyboardState } from '@/lib/gameLogic';
import { loadStats, saveStats, updateStats } from '@/lib/stats';
import { GameStats, Settings } from '@/types/game';

const DEFAULT_SETTINGS: Settings = {
  darkMode: true,
  colorBlindMode: false,
};

export default function GameBoard() {
  const {
    gameState,
    addLetter,
    deleteLetter,
    submitGuess,
    invalidWord,
  } = useGameState();

  const [stats, setStats] = useState<GameStats>(loadStats());
  const [settings, setSettings] = useLocalStorage<Settings>(
    'devWordle_settings',
    DEFAULT_SETTINGS
  );

  const [showHelp, setShowHelp] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [hasShownStats, setHasShownStats] = useState(false);

  // Apply dark mode on mount
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkMode]);

  // Show stats modal when game ends
  useEffect(() => {
    if (
      (gameState.gameStatus === 'won' || gameState.gameStatus === 'lost') &&
      !hasShownStats
    ) {
      // Update stats
      const won = gameState.gameStatus === 'won';
      const newStats = updateStats(stats, won, gameState.guesses.length);
      setStats(newStats);
      saveStats(newStats);

      // Show stats modal after a delay
      setTimeout(() => {
        setShowStats(true);
        setHasShownStats(true);
      }, 2000);
    }
  }, [gameState.gameStatus, hasShownStats, stats, gameState.guesses.length]);

  useKeyboard({
    onLetterPress: addLetter,
    onEnterPress: submitGuess,
    onBackspacePress: deleteLetter,
  });

  const keyboardState = getKeyboardState(
    gameState.guesses,
    gameState.evaluations
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onHelpClick={() => setShowHelp(true)}
        onStatsClick={() => setShowStats(true)}
        onSettingsClick={() => setShowSettings(true)}
      />

      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-8">
        <Grid
          guesses={gameState.guesses}
          currentGuess={gameState.currentGuess}
          evaluations={gameState.evaluations}
          invalidWord={invalidWord}
        />

        <div className="mt-8">
          <Keyboard
            onLetterClick={addLetter}
            onEnterClick={submitGuess}
            onBackspaceClick={deleteLetter}
            keyboardState={keyboardState}
          />
        </div>

        {gameState.gameStatus === 'won' && (
          <div className="mt-8 text-xl font-bold text-green-600 dark:text-correct animate-bounce text-center">
            🎉 Excellent! You solved it in {gameState.guesses.length}{' '}
            {gameState.guesses.length === 1 ? 'guess' : 'guesses'}!
          </div>
        )}

        {gameState.gameStatus === 'lost' && (
          <div className="mt-8 text-xl font-bold text-red-600 dark:text-red-400 text-center">
            😔 The word was{' '}
            <span className="font-mono">{gameState.targetWord}</span>
          </div>
        )}
      </main>

      <StatsModal
        isOpen={showStats}
        onClose={() => setShowStats(false)}
        stats={stats}
        guesses={gameState.guesses}
        evaluations={gameState.evaluations}
        gameWon={gameState.gameStatus === 'won'}
        gameLost={gameState.gameStatus === 'lost'}
      />

      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onSettingsChange={setSettings}
      />
    </div>
  );
}
