/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#f7f4ec",
        ink: "#1c1b18",
        accent: "#c46a2f",
        accentSoft: "#f4d7b4",
        pine: "#29473f",
        mist: "#edf4ef"
      },
      boxShadow: {
        panel: "0 20px 45px rgba(28, 27, 24, 0.08)"
      },
      fontFamily: {
        sans: ['"Space Grotesk"', '"Noto Sans KR"', '"Segoe UI"', "sans-serif"]
      }
    }
  },
  plugins: []
};
