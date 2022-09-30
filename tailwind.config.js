/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        decay: ['Decay-White-Alt', 'sans-serif'],
        grotta: ['Grotta-Regular', 'serif'],
        grottaMedium: ['Grotta-Medium', 'serif'],
      },
      screens: {
        '3xl': '2200px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
