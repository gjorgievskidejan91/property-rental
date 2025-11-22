/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Outfit", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#0F172A", // Deep Navy
          light: "#1E293B",
          dark: "#020617",
        },
        secondary: {
          DEFAULT: "#F59E0B", // Soft Gold/Amber
          hover: "#D97706",
        },
        accent: {
          DEFAULT: "#F43F5E", // Coral
        },
        background: {
          light: "#F8FAFC",
          dark: "#0F172A",
        },
        surface: {
          light: "#FFFFFF",
          dark: "#1E293B",
        },
      },
      gridTemplateColumns: {
        "70/30": "70% 28%",
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      backdropBlur: {
        'glass': '4px',
      },
    },
  },
  plugins: [],
};
