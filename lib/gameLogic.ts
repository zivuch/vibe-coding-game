import { LetterState, GameStatus } from '@/types/game';
import { WORD_LENGTH, MAX_GUESSES } from './constants';

export function checkGuess(guess: string, target: string): LetterState[] {
  const result: LetterState[] = new Array(WORD_LENGTH).fill('absent');
  const targetLetters = target.split('');
  const guessLetters = guess.split('');

  // Create a frequency map for target letters
  const targetFreq: { [key: string]: number } = {};
  targetLetters.forEach(letter => {
    targetFreq[letter] = (targetFreq[letter] || 0) + 1;
  });

  // First pass: mark correct positions (green)
  guessLetters.forEach((letter, i) => {
    if (letter === targetLetters[i]) {
      result[i] = 'correct';
      targetFreq[letter]--;
    }
  });

  // Second pass: mark present letters (yellow)
  guessLetters.forEach((letter, i) => {
    if (result[i] === 'correct') return; // Skip already marked

    if (targetFreq[letter] && targetFreq[letter] > 0) {
      result[i] = 'present';
      targetFreq[letter]--;
    }
  });

  return result;
}

export function getGameStatus(
  guesses: string[],
  targetWord: string
): GameStatus {
  const lastGuess = guesses[guesses.length - 1];

  if (lastGuess === targetWord) {
    return 'won';
  }

  if (guesses.length >= MAX_GUESSES) {
    return 'lost';
  }

  return 'playing';
}

export function getKeyboardState(
  guesses: string[],
  evaluations: LetterState[][]
): { [key: string]: LetterState } {
  const keyboardState: { [key: string]: LetterState } = {};

  guesses.forEach((guess, guessIndex) => {
    guess.split('').forEach((letter, letterIndex) => {
      const currentState = evaluations[guessIndex][letterIndex];
      const existingState = keyboardState[letter];

      // Priority: correct > present > absent
      if (!existingState ||
          currentState === 'correct' ||
          (currentState === 'present' && existingState !== 'correct')) {
        keyboardState[letter] = currentState;
      }
    });
  });

  return keyboardState;
}

export function isWordComplete(word: string): boolean {
  return word.length === WORD_LENGTH;
}
