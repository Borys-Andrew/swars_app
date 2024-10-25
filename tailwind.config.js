/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'main-bg': "url('./assets/bg-img.jpg')",
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
