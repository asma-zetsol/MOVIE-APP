/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'custom-gray': 'rgb(13, 13, 13)',
        'custom-lightgray':'rgb(26, 26, 26)'
      },
      screens: {
        "wide": "962px",
        "small":"400px",
        "large":"1356px",
        "middle":"900px",
        "lmiddle":"840px"
      },
      aspectRatio:{
        'square':'1/1.5'
      }
    },
  },
  plugins: [],
}

