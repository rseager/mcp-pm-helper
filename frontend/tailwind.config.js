/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'rgb(55, 63, 81)',
        foreground: 'rgb(234, 240, 246)',
        primary: {
          DEFAULT: 'rgb(0, 152, 210)',
          foreground: 'rgb(234, 240, 246)',
        },
        card: {
          DEFAULT: 'rgb(234, 240, 246)',
          foreground: 'rgb(55, 63, 81)',
        },
        sidebar: {
          DEFAULT: 'rgb(0, 118, 163)',
          foreground: 'rgb(234, 240, 246)',
        },
        popover: {
          DEFAULT: 'rgb(255, 255, 255)',
          foreground: 'rgb(55, 63, 81)',
        },
        secondary: {
          DEFAULT: 'rgb(234, 240, 246)',
          foreground: 'rgb(55, 63, 81)',
        },
        muted: {
          DEFAULT: 'rgba(55, 63, 81, 0.7)',
          foreground: 'rgb(55, 63, 81)',
        },
        accent: {
          DEFAULT: 'rgba(0, 152, 210, 0.1)',
          foreground: 'rgb(55, 63, 81)',
        },
        destructive: {
          DEFAULT: '#ff4444',
          foreground: 'rgb(234, 240, 246)',
        },
        border: 'rgba(55, 63, 81, 0.2)',
        input: 'rgba(55, 63, 81, 0.2)',
        ring: 'rgb(55, 63, 81)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};