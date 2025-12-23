'use client';

import KeyboardKey from './KeyboardKey';
import { LetterState } from '@/types/game';
import { KEYBOARD_ROWS } from '@/lib/constants';

type KeyboardProps = {
  onLetterClick: (letter: string) => void;
  onEnterClick: () => void;
  onBackspaceClick: () => void;
  keyboardState: { [key: string]: LetterState };
};

export default function Keyboard({
  onLetterClick,
  onEnterClick,
  onBackspaceClick,
  keyboardState,
}: KeyboardProps) {
  const handleKeyClick = (key: string) => {
    if (key === 'ENTER') {
      onEnterClick();
    } else if (key === 'BACKSPACE') {
      onBackspaceClick();
    } else {
      onLetterClick(key);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-2">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex justify-center gap-1.5 mb-2"
        >
          {row.map((key) => (
            <KeyboardKey
              key={key}
              letter={key}
              state={keyboardState[key]}
              onClick={handleKeyClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
