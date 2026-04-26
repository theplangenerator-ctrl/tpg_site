import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#0a0a0a',
      red: {
        DEFAULT: '#C41E1E',
        hover: '#E02020',
      },
      white: '#F5F5F5',
      gray: {
        dark: '#141414',
        card: '#1c1c1c',
        border: '#2a2a2a',
        muted: '#6b6b6b',
      },
    },
    fontFamily: {
      barlow: ['var(--font-barlow)', 'sans-serif'],
      inter: ['var(--font-inter)', 'sans-serif'],
      space: ['var(--font-space)', 'sans-serif'],
    },
    extend: {
      fontSize: {
        'hero': 'clamp(3.5rem, 9vw, 9rem)',
        'display': 'clamp(2.5rem, 6vw, 6rem)',
        'heading': 'clamp(1.75rem, 4vw, 3rem)',
      },
      lineHeight: {
        'hero': '0.95',
        'tight': '1.05',
      },
      letterSpacing: {
        'label': '0.08em',
        'display': '-0.02em',
      },
      animation: {
        'pulse-slow': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'draw': 'draw 1.5s ease forwards',
      },
      keyframes: {
        draw: {
          from: { strokeDashoffset: '1000' },
          to: { strokeDashoffset: '0' },
        },
      },
      screens: {
        'xs': '480px',
      },
    },
  },
  plugins: [],
}

export default config
