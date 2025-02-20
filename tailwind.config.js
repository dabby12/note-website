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
