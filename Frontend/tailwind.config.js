/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        sidebar: {
          DEFAULT: "#18181b", // dark sidebar
        },
        primary: {
          DEFAULT: "#2563eb", // blue
        },
        background: {
          DEFAULT: "#f3f4f6", // light gray
        },
        accent: {
          DEFAULT: "#38bdf8", // cyan accent
        },
      },
    },
  },
  plugins: [],
};
