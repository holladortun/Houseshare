/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    
    extend: {
      fontFamily:{
        sans : ['Inter', 'sans-serif']
      },
      colors:{
        'brandblue': '#444ce7',
        'lightbg' : '#F5F8FF',
        'darkgrey' : '#344054',
        'lightgrey' : '667085',
      }
    },
  },
  plugins: [],
  
};
