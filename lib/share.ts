import { LetterState } from '@/types/game';

export function generateShareText(
  guesses: string[],
  evaluations: LetterState[][],
  won: boolean
): string {
  const emojiGrid = evaluations
    .map(evaluation =>
      evaluation
        .map(state => {
          switch (state) {
            case 'correct':
              return '🟩';
            case 'present':
              return '🟨';
            case 'absent':
              return '⬛';
            default:
              return '⬜';
          }
        })
        .join('')
    )
    .join('\n');

  const result = won ? `${guesses.length}/6` : 'X/6';

  return `Dev Wordle ${result}\n\n${emojiGrid}\n\nPlay at: http://localhost:3002`;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}
