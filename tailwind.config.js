/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Open Sans", "sans-serif"],
      display: ["Lobster Two", "Open Sans", "sans-serif"],
    },
    extend: {
      colors: {
        azure: "#007efc",
        "azure-medium": "#005CB8",
        "azure-dark": "#00478F",
        tomato: "#DF0101",
        "tomato-medium": "#8E0101",
      },
    },
  },

  plugins: [require("@tailwindcss/forms")],
};
