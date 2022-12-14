/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg": "#CCCCCC",
        "dark-blue": "#1A66FF",
        "input-bg": "#E0E0E0",
        "friend-text-bg": "#CFCFCF",
      }
    },
  },
  plugins: [],
}
