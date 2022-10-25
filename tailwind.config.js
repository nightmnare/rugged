/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        spacegrotesk: ['Space Grotesk'],
        agrandir: ['Agrandir'],
        modius: ['Modius'],
      },
      colors: {
        'glow-orange': 'rgb(237 153 91 / 1)',
        'light-cream': 'rgb(245 226 212 / 1)',
        pink: 'rgb(239 188 197 / 1)',
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.custom-scroll': {
          '&::-webkit-scrollbar': {
            width: '0.2em',
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '999px',
            backgroundColor: '#fff',
            outline: '1px solid #fff',
          },
        },
      });
    }),
  ],
};
