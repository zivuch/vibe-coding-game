'use client';

import { useState } from 'react';
import { GameState, LetterState } from '@/types/game';
import { checkGuess, getGameStatus } from '@/lib/gameLogic';
import { isValidWord, getDailyWord } from '@/lib/words';
import { MAX_GUESSES, WORD_LENGTH } from '@/lib/constants';

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>({
    guesses: [],
    currentGuess: '',
    gameStatus: 'playing',
    currentRow: 0,
    targetWord: getDailyWord(),
    evaluations: [],
  });

  const [invalidWord, setInvalidWord] = useState(false);

  const addLetter = (letter: string) => {
    if (gameState.gameStatus !== 'playing') return;
    if (gameState.currentGuess.length >= WORD_LENGTH) return;

    setGameState(prev => ({
      ...prev,
      currentGuess: prev.currentGuess + letter,
    }));
  };

  const deleteLetter = () => {
    if (gameState.gameStatus !== 'playing') return;

    setGameState(prev => ({
      ...prev,
      currentGuess: prev.currentGuess.slice(0, -1),
    }));
  };

  const submitGuess = () => {
    if (gameState.gameStatus !== 'playing') return;
    if (gameState.currentGuess.length !== WORD_LENGTH) return;

    // Validate word
    if (!isValidWord(gameState.currentGuess)) {
      setInvalidWord(true);
      setTimeout(() => setInvalidWord(false), 500);
      return;
    }

    // Check the guess
    const evaluation = checkGuess(
      gameState.currentGuess,
      gameState.targetWord
    );

    const newGuesses = [...gameState.guesses, gameState.currentGuess];
    const newEvaluations = [...gameState.evaluations, evaluation];
    const newStatus = getGameStatus(newGuesses, gameState.targetWord);

    setGameState({
      ...gameState,
      guesses: newGuesses,
      evaluations: newEvaluations,
      currentGuess: '',
      currentRow: gameState.currentRow + 1,
      gameStatus: newStatus,
    });

    return newStatus;
  };

  return {
    gameState,
    addLetter,
    deleteLetter,
    submitGuess,
    invalidWord,
  };
}
