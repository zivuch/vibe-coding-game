'use client';

type HeaderProps = {
  onHelpClick: () => void;
  onStatsClick: () => void;
  onSettingsClick: () => void;
};

export default function Header({
  onHelpClick,
  onStatsClick,
  onSettingsClick,
}: HeaderProps) {
  return (
    <header className="border-b border-gray-300 dark:border-dev-border mb-8">
      <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
        <button
          onClick={onHelpClick}
          className="text-2xl hover:opacity-70 transition-opacity"
          aria-label="Help"
        >
          ❓
        </button>

        <h1 className="text-3xl font-bold tracking-tight font-mono">
          <span className="text-dev-accent">&lt;</span>
          DEV WORDLE
          <span className="text-dev-accent">/&gt;</span>
        </h1>

        <div className="flex gap-2">
          <button
            onClick={onStatsClick}
            className="text-2xl hover:opacity-70 transition-opacity"
            aria-label="Statistics"
          >
            📊
          </button>
          <button
            onClick={onSettingsClick}
            className="text-2xl hover:opacity-70 transition-opacity"
            aria-label="Settings"
          >
            ⚙️
          </button>
        </div>
      </div>
    </header>
  );
}
