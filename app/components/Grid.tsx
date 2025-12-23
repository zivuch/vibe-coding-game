'use client';

import Row from './Row';
import { LetterState } from '@/types/game';
import { MAX_GUESSES } from '@/lib/constants';

type GridProps = {
  guesses: string[];
  currentGuess: string;
  evaluations: LetterState[][];
  invalidWord: boolean;
};

export default function Grid({
  guesses,
  currentGuess,
  evaluations,
  invalidWord,
}: GridProps) {
  const rows = [];

  for (let i = 0; i < MAX_GUESSES; i++) {
    const guess = guesses[i] || '';
    const isCurrentRow = i === guesses.length;
    const evaluation = evaluations[i];

    rows.push(
      <div
        key={i}
        className={invalidWord && isCurrentRow ? 'animate-shake' : ''}
      >
        <Row
          guess={guess}
          evaluation={evaluation}
          currentGuess={isCurrentRow ? currentGuess : ''}
          isCurrentRow={isCurrentRow}
          isRevealing={i === guesses.length - 1 && guess !== ''}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mb-8">
      {rows}
    </div>
  );
}
