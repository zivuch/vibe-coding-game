'use client';

import { LetterState } from '@/types/game';
import { useEffect, useState } from 'react';

type TileProps = {
  letter: string;
  state: LetterState;
  delay?: number;
  shouldAnimate?: boolean;
};

export default function Tile({
  letter,
  state,
  delay = 0,
  shouldAnimate = false
}: TileProps) {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (shouldAnimate && state !== 'empty' && state !== 'tbd') {
      setTimeout(() => {
        setShowAnimation(true);
      }, delay);
    }
  }, [shouldAnimate, state, delay]);

  const getStateClass = () => {
    switch (state) {
      case 'correct':
        return 'tile-correct';
      case 'present':
        return 'tile-present';
      case 'absent':
        return 'tile-absent';
      case 'tbd':
        return 'tile-tbd';
      default:
        return 'tile-empty';
    }
  };

  return (
    <div
      className={`
        tile ${getStateClass()}
        ${showAnimation ? 'animate-flip' : ''}
        ${letter && state === 'tbd' ? 'scale-105' : ''}
      `}
      style={{
        animationDelay: shouldAnimate ? `${delay}ms` : '0ms',
      }}
    >
      {letter}
    </div>
  );
}
