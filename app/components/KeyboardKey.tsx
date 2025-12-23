'use client';

import { LetterState } from '@/types/game';

type KeyboardKeyProps = {
  letter: string;
  state?: LetterState;
  onClick: (letter: string) => void;
};

export default function KeyboardKey({
  letter,
  state,
  onClick,
}: KeyboardKeyProps) {
  const getStateClass = () => {
    if (!state || state === 'empty' || state === 'tbd') {
      return 'key';
    }

    switch (state) {
      case 'correct':
        return 'key key-correct';
      case 'present':
        return 'key key-present';
      case 'absent':
        return 'key key-absent';
      default:
        return 'key';
    }
  };

  const isSpecialKey = letter === 'ENTER' || letter === 'BACKSPACE';
  const displayText = letter === 'BACKSPACE' ? '⌫' : letter;

  return (
    <button
      className={`
        ${getStateClass()}
        ${isSpecialKey ? 'px-4' : 'min-w-[2.5rem]'}
        text-sm
      `}
      onClick={() => onClick(letter)}
    >
      {displayText}
    </button>
  );
}
