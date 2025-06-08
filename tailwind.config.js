/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pacifico: ["Pacifico", "cursive"],
        sacramento: ["Sacramento", "cursive"],
        indie_flower: ["Indie Flower", "cursive"],
        dancing_script: ["Dancing Script", "cursive"],
        shadow_into_light: ["Shadow Into Light", "cursive"],
        handwriting: ["Patrick Hand", "cursive"],
      },
      colors: {
        dark: {
          100: "#d1d5db",
          200: "#9ca3af",
          300: "#6b7280",
          400: "#4b5563",
          500: "#374151",
          600: "#1f2937",
          700: "#111827",
          800: "#0f172a",
          900: "#0a0e14",
        },
        "light-blue": {
          50: "#f0f9ff",
          100: "#d1e9ff",
          200: "#a0c8e1",
          300: "#7baed0",
          400: "#4c93be",
          500: "#ADD8E6",
          600: "#8cbfd0",
          700: "#659fb9",
          800: "#4a7a9f",
          900: "#335a7f",
        },
        "light-green": {
          50: "#f1fbf5",
          100: "#d2f4d1",
          200: "#a4e2a3",
          300: "#78d076",
          400: "#4ec24e",
          500: "#9FE2BF",
          600: "#7cc78c",
          700: "#5aa86a",
          800: "#3f8a49",
          900: "#2d6e28",
        },
        "light-purple": {
          50: "#f9f5fd",
          100: "#ede3fa",
          200: "#d8c6f2",
          300: "#c3a9ea",
          400: "#af8de2",
          500: "#9a71d9",
          600: "#8556c5",
          700: "#703eb0",
          800: "#5c279c",
          900: "#471188",
        },
        "light-coral": {
          50: "#fff0f0",
          100: "#ffe0e0",
          200: "#ffc2c2",
          300: "#ffa3a3",
          400: "#ff8585",
          500: "#ff6666",
          600: "#e64c4c",
          700: "#cc3333",
          800: "#b31919",
          900: "#990000",
        },
        "light-amber": {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        neutral: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
        "flame-red": {
          100: "#FFB5A7", // soft highlight
          300: "#F89E6F", // peachy mid-tone
          500: "#E75A6C", // main brand red
          700: "#7C1F1F", // deep red shadow
          900: "#2C1212", // almost black red
        },
        spring: {
          pink: "#FADADD", // Blush Pink – cherry blossoms
          mint: "#B2E2BD", // Mint Green – fresh leaves
          sky: "#A0D8EF", // Sky Blue – clear sky
          lavender: "#C3B1E1", // Lavender – floral
        },
        summer: {
          yellow: "#FFE066", // Sunshine Yellow – sun
          coral: "#FF6F59", // Coral Orange – beach
          ocean: "#2E86AB", // Ocean Blue – sea
          leaf: "#4CAF50", // Leaf Green – foliage
        },
        autumn: {
          pumpkin: "#D2691E", // Pumpkin Orange – fall leaves
          burgundy: "#800020", // Deep Burgundy – harvest
          mustard: "#FFB627", // Mustard Yellow – golden hues
          forest: "#4E342E", // Forest Brown – earth
        },
        winter: {
          ice: "#B3DDF2", // Ice Blue – frost
          navy: "#1A1A40", // Midnight Navy – night
          silver: "#D3D3D3", // Silver Gray – sky
          cranberry: "#8B0000", // Cranberry Red – holiday
        },
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "ping-slow": "ping 3s cubic-bezier(0, 0, 0.2, 1) infinite",
        "float-up": "float-up 1s ease-in-out infinite",
        "bounce-slow": "bounce 3s ease-in-out infinite",
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
        "fade-in": "fadeIn 0.75s ease-in",
        "slide-in": "slideIn 0.5s ease-out",
        "scale-in": "scaleIn 0.5s ease-out",
      },
      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        ping: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "75%, 100%": { transform: "scale(2)", opacity: 0 },
        },
        "float-up": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-10px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideIn: {
          "0%": { transform: "translateX(-20px)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        bounce: {
          "0%, 100%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(-25px)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
    },
  },
  plugins: [],
};
