/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        noir: "#061018",
        slate: "#0B1C28",
        teal: "#00E5C2",
        cyan: "#22B8F0",
        mint: "#1ED6A5",
        muted: "#9AAFBD"
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        sans: ["DM Sans", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 32px rgba(0,229,194,.18)"
      },
      borderRadius: { "4xl": "1.5rem" }
    }
  },
  plugins: []
};
