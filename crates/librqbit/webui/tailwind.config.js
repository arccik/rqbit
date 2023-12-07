/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],

  plugins: [require("tailwindcss-animate")],
}