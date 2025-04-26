/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        // Colores específicos de fondo si es necesario
      },
      textColor: {
        // Colores específicos de texto si es necesario
      },
    },
  },
  plugins: [],
};
