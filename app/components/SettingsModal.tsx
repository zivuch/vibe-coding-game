'use client';

import { Settings } from '@/types/game';

type SettingsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
};

export default function SettingsModal({
  isOpen,
  onClose,
  settings,
  onSettingsChange,
}: SettingsModalProps) {
  if (!isOpen) return null;

  const toggleDarkMode = () => {
    const newSettings = { ...settings, darkMode: !settings.darkMode };
    onSettingsChange(newSettings);

    // Update document class
    if (newSettings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleColorBlindMode = () => {
    onSettingsChange({
      ...settings,
      colorBlindMode: !settings.colorBlindMode,
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-dev-surface rounded-lg p-6 max-w-md w-full border border-gray-300 dark:border-dev-border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Settings</h2>
          <button
            onClick={onClose}
            className="text-2xl hover:opacity-70 transition-opacity"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-dev-border">
            <div>
              <div className="font-semibold">Dark Mode</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Toggle dark/light theme
              </div>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`
                w-12 h-6 rounded-full transition-colors relative
                ${settings.darkMode ? 'bg-dev-accent' : 'bg-gray-300'}
              `}
            >
              <div
                className={`
                  w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5
                  ${settings.darkMode ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-dev-border">
            <div>
              <div className="font-semibold">Color Blind Mode</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                High contrast colors
              </div>
            </div>
            <button
              onClick={toggleColorBlindMode}
              className={`
                w-12 h-6 rounded-full transition-colors relative
                ${settings.colorBlindMode ? 'bg-dev-accent' : 'bg-gray-300'}
              `}
            >
              <div
                className={`
                  w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5
                  ${settings.colorBlindMode ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>

          <div className="pt-4 text-center">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Dev Wordle v1.0.0
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Built with Next.js & TypeScript
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
