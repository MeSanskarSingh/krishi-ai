/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        greenfooter:"#3F9148",
        background:"#FCF9F6",
        
      },
      fontFamily: {
        mochiy: ["MochiyPop", "sans-serif"],
        mitr: ["Mitr", "sans-serif"],
        merritweather: ["MerriweatherSans", "sans-serif"]
      },
    },
  },
  plugins: [],
};
