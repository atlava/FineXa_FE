/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Pastikan ada baris ini!
  ],
  theme: {
    extend: {
      colors: {
        finexa: '#4CAF50',
        finexaDark: '#388E3C',
      }
    },
  },
  plugins: [],
}