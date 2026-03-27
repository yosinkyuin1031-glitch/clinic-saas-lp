import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#1e3a5f",
          50: "#f0f5fa",
          100: "#dae4f0",
          200: "#b5c9e1",
          300: "#8bacd0",
          400: "#5c8bbf",
          500: "#3a6ea5",
          600: "#1e3a5f",
          700: "#182e4c",
          800: "#122339",
          900: "#0c1726",
        },
        accent: {
          DEFAULT: "#0ea5e9",
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
        },
        cta: {
          DEFAULT: "#e9520e",
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#e9520e",
          600: "#c2410c",
        },
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
