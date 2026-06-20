import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Trading Journal brand colors
        loss: {
          DEFAULT: "#c0392b",
          light: "#b03020",
          muted: "rgba(192,57,43,0.12)",
          border: "rgba(192,57,43,0.30)",
        },
        gain: {
          DEFAULT: "#1e8449",
          light: "#1a6b3c",
        },
        amber: {
          trading: "#d4a017",
        },
      },
      fontFamily: {
        mono: ["ui-monospace", "SF Mono", "Cascadia Code", "Courier New", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
