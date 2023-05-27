/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Open Sans", "sans-serif"],
      display: ["Lobster Two", "Open Sans", "sans-serif"],
    },
    extend: {},
  },

  plugins: [require("@tailwindcss/forms")],
};
