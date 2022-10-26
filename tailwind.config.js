/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#01575C',
        secondary: '#D9E6E7',
        accent: '#E2F4C2',
        gray: {
          light: '#EAEAEA',
          dark: '#7C7C7C',
        },
        danger: {
          main: '#E42F2F',
          sub: '#FFCCCC',
        },
        divisi: {
          mobile: '#337BE7',
          pm: '#A54F4F',
          pr: '#E52020',
          fe: '#369869',
          be: '#707070',
        },
      },
    },
  },
  plugins: [],
};
