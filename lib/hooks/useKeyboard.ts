'use client';

import { useEffect } from 'react';

type KeyHandler = {
  onLetterPress: (letter: string) => void;
  onEnterPress: () => void;
  onBackspacePress: () => void;
};

export function useKeyboard({
  onLetterPress,
  onEnterPress,
  onBackspacePress,
}: KeyHandler) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();

      if (key === 'ENTER') {
        onEnterPress();
      } else if (key === 'BACKSPACE') {
        onBackspacePress();
      } else if (/^[A-Z]$/.test(key)) {
        onLetterPress(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onLetterPress, onEnterPress, onBackspacePress]);
}
