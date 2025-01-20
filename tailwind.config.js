/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all React files
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "app-color": "#7B1984",
        "medium-black": "#2F2F2F",
        "opacity-gray": "#00000098",
        completed: "#A2D6A0",
        inProgress: "#85D9F1",
        toDo: "#FAC3FF",
      },
      backgroundColor: {
        "app-login": "#FFF9F9",
        toDo: "#FAC3FF",
        progress: "#85D9F1",
        completed: "#CEFFCC",
        "light-gray": "#F1F1F1",
        "medium-gray": "#DDDADD",
        header: "#FAEEFC",
      },
      borderColor: {
        "light-purple": "#7b198462",
        "light-gray": "#F1F1F1",
        "medium-gray": "#DDDADD",
      },
      boxShadow: {
        "dropdown-menu": "0px 2px 3px 0px #00000033",
      },
      keyframes: {
        slideRight: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideLeft: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        slideRight: "slideRight 0.2s ease-in-out forwards",
        slideLeft: "slideLeft 0.2s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
