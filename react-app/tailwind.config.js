/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens:{

      'laptop': '840px',
      // => @media (min-width: 1024px) { ... }
      'desktop': '1200px',
      // => @media (max-width: 1280px) { ... }
    },
    color:{
      'blueColor': '#C3DDFD',
    },
    extend: {},
  },
  plugins: [],
}