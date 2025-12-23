'use client';

import Tile from './Tile';
import { LetterState } from '@/types/game';
import { WORD_LENGTH, REVEAL_DELAY } from '@/lib/constants';

type RowProps = {
  guess: string;
  evaluation?: LetterState[];
  currentGuess?: string;
  isCurrentRow?: boolean;
  isRevealing?: boolean;
};

export default function Row({
  guess,
  evaluation,
  currentGuess = '',
  isCurrentRow = false,
  isRevealing = false,
}: RowProps) {
  const letters = guess.split('');
  const tiles = [];

  for (let i = 0; i < WORD_LENGTH; i++) {
    const letter = letters[i] || '';
    let state: LetterState = 'empty';

    if (evaluation && evaluation[i]) {
      state = evaluation[i];
    } else if (isCurrentRow && currentGuess[i]) {
      state = 'tbd';
    }

    tiles.push(
      <Tile
        key={i}
        letter={isCurrentRow ? currentGuess[i] || '' : letter}
        state={state}
        delay={i * REVEAL_DELAY}
        shouldAnimate={isRevealing}
      />
    );
  }

  return (
    <div className="flex gap-1.5 mb-1.5">
      {tiles}
    </div>
  );
}
