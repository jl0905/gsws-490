/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'wm-green': '#115740',
        'wm-gold': '#FFD700',
        'wm-green-dark': '#0d4530',
        'wm-gold-dark': '#FFC700',
      }
    },
  },
  plugins: [],
}
