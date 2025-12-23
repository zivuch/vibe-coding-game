import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dev theme colors
        'dev-bg': '#0d1117',
        'dev-surface': '#161b22',
        'dev-border': '#30363d',
        'dev-text': '#c9d1d9',
        'dev-accent': '#58a6ff',
        'correct': '#2ea043',
        'present': '#9e6a03',
        'absent': '#6e7681',
      },
      keyframes: {
        flip: {
          '0%': { transform: 'rotateX(0deg)' },
          '50%': { transform: 'rotateX(-90deg)' },
          '100%': { transform: 'rotateX(0deg)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' },
        },
        bounce: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
      },
      animation: {
        flip: 'flip 0.6s ease-in-out',
        shake: 'shake 0.5s ease-in-out',
        bounce: 'bounce 0.3s ease-in-out',
      },
    },
  },
  plugins: [],
}

export default config
