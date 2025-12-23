'use client';

import Tile from './Tile';

type HelpModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-dev-surface rounded-lg p-6 max-w-md w-full border border-gray-300 dark:border-dev-border max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">How to Play</h2>
          <button
            onClick={onClose}
            className="text-2xl hover:opacity-70 transition-opacity"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 text-sm">
          <p>
            Guess the <strong>DEV WORDLE</strong> in 6 tries.
          </p>

          <p>
            Each guess must be a valid 5-letter programming term. Hit the enter
            button to submit.
          </p>

          <p>
            After each guess, the color of the tiles will change to show how
            close your guess was to the word.
          </p>

          <div className="border-t border-gray-300 dark:border-dev-border pt-4 mt-4">
            <p className="font-semibold mb-3">Examples</p>

            <div className="mb-4">
              <div className="flex gap-1 mb-2">
                <Tile letter="A" state="correct" />
                <Tile letter="S" state="empty" />
                <Tile letter="Y" state="empty" />
                <Tile letter="N" state="empty" />
                <Tile letter="C" state="empty" />
              </div>
              <p className="text-xs">
                The letter <strong>A</strong> is in the word and in the correct spot.
              </p>
            </div>

            <div className="mb-4">
              <div className="flex gap-1 mb-2">
                <Tile letter="R" state="empty" />
                <Tile letter="E" state="present" />
                <Tile letter="A" state="empty" />
                <Tile letter="C" state="empty" />
                <Tile letter="T" state="empty" />
              </div>
              <p className="text-xs">
                The letter <strong>E</strong> is in the word but in the wrong spot.
              </p>
            </div>

            <div className="mb-4">
              <div className="flex gap-1 mb-2">
                <Tile letter="F" state="empty" />
                <Tile letter="L" state="empty" />
                <Tile letter="A" state="empty" />
                <Tile letter="S" state="absent" />
                <Tile letter="K" state="empty" />
              </div>
              <p className="text-xs">
                The letter <strong>S</strong> is not in the word in any spot.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-300 dark:border-dev-border pt-4 mt-4">
            <p className="font-semibold mb-2">Dev Theme</p>
            <p className="text-xs">
              All words are programming-related terms: languages, frameworks,
              concepts, and tools familiar to developers.
            </p>
            <p className="text-xs mt-2 italic">
              Examples: ASYNC, REDUX, FETCH, CACHE, STACK, QUERY
            </p>
          </div>

          <div className="border-t border-gray-300 dark:border-dev-border pt-4 mt-4 text-center">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              A new word is available each day!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
