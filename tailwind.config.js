/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        popout: "height, width, border-radius",
      },
      boxShadow: {
        normal: "0px 0px 10px 0px rgba(0,0,0,0.75)",
      },
      colors: {
        spotify: "#1DB954",
      },
      animation: {
        "single-bounce": "single-bounce 250ms ease-in-out",
        "small-wiggle": "small-wiggle 250ms ease-in-out",
        "medium-wiggle": "medium-wiggle 250ms ease-in-out",
      },
      keyframes: {
        "single-bounce": {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-15%)",
          },
        },
        "medium-wiggle": {
          "0%, 100%": {
            rotate: "0deg",
          },
          "25%": {
            rotate: "20deg",
          },
          "50%": {
            rotate: "-20deg",
          },
        },
        "small-wiggle": {
          "0%, 100%": {
            rotate: "0deg",
          },
          "25%": {
            rotate: "5deg",
          },
          "50%": {
            rotate: "-5deg",
          },
        },
      },
    },
  },
  plugins: [],
};
