/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js", //Line for date picker component package
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

