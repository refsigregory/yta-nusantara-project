/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.{html,js,py}", "./node_modules/flowbite/**/*.js"],
  theme: {
    fontFamily: {
      'primary': "'Kumbh Sans', sans-serif"
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        lg: "50px",
      },
    },
    extend: {
      colors: {
        primary: '#F09638',
        secondary: '#FEFAF6',
        'dark-1': '#4A556C',
        'dark-2': '#333461',
        'dark-3': '#A4A7B1',
        choco: '#85490A',
        orange: '#E37D11',
        cream: '#F7C897',
        light: '#FEFAF6',
      }
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

