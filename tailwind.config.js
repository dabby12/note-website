/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
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
        'light-purple': {
          50: '#f9f5fd', // very light purple
          100: '#ede3fa', // light purple
          200: '#d8c6f2', // pastel light purple
          300: '#c3a9ea', // muted light purple
          400: '#af8de2', // slightly deeper purple
          500: '#9a71d9', // main light purple
          600: '#8556c5', // deep purple tone
          700: '#703eb0', // even deeper purple
          800: '#5c279c', // darker purple
          900: '#471188', // very dark purple
        },
        'light-coral': {
          50: '#fff0f0', // very light coral
          100: '#ffe0e0', // light coral
          200: '#ffc2c2', // pastel light coral
          300: '#ffa3a3', // muted light coral
          400: '#ff8585', // slightly deeper coral
          500: '#ff6666', // main light coral
          600: '#e64c4c', // deep coral tone
          700: '#cc3333', // even deeper coral
          800: '#b31919', // darker coral
          900: '#990000', // very dark coral
        },
        'light-amber': {
          50: '#fffbeb', // very light amber
          100: '#fef3c7', // light amber
          200: '#fde68a', // pastel light amber
          300: '#fcd34d', // muted light amber
          400: '#fbbf24', // slightly deeper amber
          500: '#f59e0b', // main light amber
          600: '#d97706', // deep amber tone
          700: '#b45309', // even deeper amber
          800: '#92400e', // darker amber
          900: '#78350f', // very dark amber
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
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'fade-in': 'fadeIn 0.75s ease-in',
        'slide-in': 'slideIn 0.5s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
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
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideIn: {
          '0%': { transform: 'translateX(-20px)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(-25px)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
    },
  },
  plugins: [],
}
