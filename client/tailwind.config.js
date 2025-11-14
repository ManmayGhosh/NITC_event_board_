/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",  // ensures Tailwind scans all your React files
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1e40af",  // NITC blue shade
        accent: "#facc15",   // highlight yellow
      },
      boxShadow: {
        card: "0 4px 14px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
};
