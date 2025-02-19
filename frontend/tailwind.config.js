/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: ["./frontend/src/**/*.{js, jsx, ts, tsx}"],
  content: ["./src/**/*.{js, jsx, ts, tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        Oswald: ["Oswald", "sans-serif"],
        Archivo: ["Archivo", "sans-serif"],
        Inter: ["Inter", "sans-serif"]
      }

    },
    colors: {
      babyblue: "#80AFE8",
      navyblue: "#12253D"
    }
  },
  plugins: [],
}

