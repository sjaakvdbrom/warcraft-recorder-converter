/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'media',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        lg: '2rem',
      },
    },
    extend: {
      colors: {
        current: "currentColor",
        transparent: "transparent",
        primary: "#4A6CF7",
        black: "#090E34",
      }
    },
  },
  plugins: [],
}

