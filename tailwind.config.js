/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // or 'media' for automatic dark mode based on user's system preference
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          100: '#d1d5db',
          200: '#9ca3af',
          300: '#6b7280',
          400: '#4b5563',
          500: '#374151',
          600: '#1f2937',
          700: '#111827',
          800: '#0f172a',
          900: '#0a0e14',
        },
        'light-blue': {
          50: '#f0f9ff', // very light blue
          100: '#d1e9ff', // light blue
          200: '#a0c8e1', // pastel light blue
          300: '#7baed0', // muted light blue
          400: '#4c93be', // slightly deeper blue
          500: '#ADD8E6', // main light blue (default)
          600: '#8cbfd0', // deep blue tone
          700: '#659fb9', // even deeper blue
          800: '#4a7a9f', // darker blue
          900: '#335a7f', // very dark blue
        },
        'light-green': {
          50: '#f1fbf5', // very light green
          100: '#d2f4d1', // light green
          200: '#a4e2a3', // pastel light green
          300: '#78d076', // muted light green
          400: '#4ec24e', // slightly deeper green
          500: '#9FE2BF', // main light green (default)
          600: '#7cc78c', // deeper green tone
          700: '#5aa86a', // even deeper green
          800: '#3f8a49', // darker green
          900: '#2d6e28', // very dark green
        },
        'neutral': {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'float-up': 'float-up 1s ease-in-out infinite',
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        ping: {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '75%, 100%': { transform: 'scale(2)', opacity: 0 },
        },
        'float-up': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
