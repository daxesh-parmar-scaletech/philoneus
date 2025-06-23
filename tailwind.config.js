/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['GT America', 'sans-serif'], // Add GT America font family
      },
    },
  },
  plugins: [],
};
