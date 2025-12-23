export type LetterState = 'correct' | 'present' | 'absent' | 'empty' | 'tbd';

export type TileState = {
  letter: string;
  state: LetterState;
};

export type GameStatus = 'playing' | 'won' | 'lost';

export type GameState = {
  guesses: string[];           // Array of submitted guesses
  currentGuess: string;        // Current typing input
  gameStatus: GameStatus;
  currentRow: number;
  targetWord: string;
  evaluations: LetterState[][]; // Color states for each guess
};

export type KeyboardState = {
  [key: string]: LetterState;  // Track state of each letter
};

export type GameStats = {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
  };
  lastPlayedDate: string;
};

export type Settings = {
  darkMode: boolean;
  colorBlindMode: boolean;
};
