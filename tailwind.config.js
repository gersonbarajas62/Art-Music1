/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Include all files in the Next.js app directory
    "./components/**/*.{js,ts,jsx,tsx}", // Include custom components
  ],
  theme: {
    extend: {
      colors: {
        'custom-yellow': '#ffd700', // Primary yellow for buttons/links
        'custom-hover-yellow': '#ffcc00', // Hover color for buttons/links
        'dark-bg': '#000', // Default dark background
        'light-text': '#fff', // Default light text color
        'dark-gray': '#111', // Slightly lighter black
      },
      fontFamily: {
        sans: ['Arial', 'sans-serif'], // Default font family
      },
    },
  },
  plugins: [],
};
