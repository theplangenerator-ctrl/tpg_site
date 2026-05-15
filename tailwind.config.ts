import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      paper: '#FFFFFF',
      bone: '#F4F4F1',
      fog: '#E8E8E4',
      ash: '#C9C9C4',
      steel: '#8A8A86',
      graphite: {
        50: '#9A9A95',
        100: '#6B6B66',
        200: '#3F3F3C',
        300: '#252523',
        400: '#161614',
        500: '#0B0B0A',
      },
      signal: {
        DEFAULT: '#D72323',
        hot: '#FF2E2E',
        deep: '#8A0F0F',
      },
    },
    fontFamily: {
      display: ['var(--font-display)', 'Impact', 'sans-serif'],
      body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
    },
    extend: {
      fontSize: {
        // Editorial scale — punchy on mobile, oversized on desktop
        'colossal': 'clamp(5rem, 20vw, 22rem)',
        'mega': 'clamp(4rem, 16vw, 16rem)',
        'hero': 'clamp(4rem, 14vw, 10rem)',
        'display': 'clamp(3.25rem, 11vw, 6rem)',
        'h1': 'clamp(2.5rem, 9vw, 3.5rem)',
        'label': '0.6875rem',
        'micro': '0.625rem',
      },
      lineHeight: {
        crush: '0.82',
        tight: '0.95',
      },
      letterSpacing: {
        crush: '-0.04em',
        editorial: '-0.025em',
        label: '0.14em',
        micro: '0.22em',
      },
      spacing: {
        gutter: 'clamp(1.25rem, 3vw, 2.5rem)',
        chapter: 'clamp(3.5rem, 10vh, 12rem)',
      },
      transitionTimingFunction: {
        industrial: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
        mech: 'cubic-bezier(0.77, 0, 0.175, 1)',
      },
      animation: {
        'scan-line': 'scan-line 3.2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'pulse-signal': 'pulse-signal 2.2s ease-in-out infinite',
      },
      keyframes: {
        'scan-line': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '20%, 80%': { opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
        'pulse-signal': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
