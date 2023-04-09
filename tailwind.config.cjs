;/ @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'gray-20': '#F8F4EB',
        'gray-50': '#EFE6E6',
        'gray-100': '#DFCCCC',
        'gray-500': '#5E0000',
        'back-0': '#fcfcfc',
        'primary-100': '#FFE1E0',
        'primary-200': '#f8a6a3',
        'primary-300': '#EA5857',
        'primary-400': '#EA5858',
        'primary-500': '#FF6B66',
        'primary-600': '#FDF0E9',
        'primary-700': '#fceadf',
        'secondary-400': '#FFCD58',
        'secondary-500': '#FFC132',
      },
      fontFamily: {
        dmsans: ['DM Sans', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      content: {},
    },
    screens: {
      xs: '480px',
      sm: '768px',
      md: '1060px',
    },
  },
  plugins: [],
}
