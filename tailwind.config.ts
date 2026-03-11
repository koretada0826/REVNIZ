import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: "#0A0A0A",
          50: "#F7F7F7",
          100: "#EDEDED",
          200: "#D9D9D9",
          300: "#B3B3B3",
          400: "#8A8A8A",
          500: "#5C5C5C",
          600: "#3D3D3D",
          700: "#2A2A2A",
          800: "#1A1A1A",
          900: "#0A0A0A",
        },
        red: {
          DEFAULT: "#C8102E",
          50: "#FEF2F3",
          100: "#FDE3E6",
          200: "#FDCBD2",
          300: "#FBA0AD",
          400: "#F6657E",
          500: "#EC3654",
          600: "#C8102E",
          700: "#AE0E28",
          800: "#8F1026",
          900: "#7B1125",
        },
        surface: "#FFFFFF",
        bg: "#FAFAFA",
        muted: "#888888",
        dim: "#AAAAAA",
        line: "#EBEBEB",
        "line-dark": "#D4D4D4",
      },
      fontFamily: {
        sans: ['"Space Grotesk"', '"Noto Sans JP"', "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "2px",
        DEFAULT: "3px",
        md: "5px",
        lg: "8px",
      },
      boxShadow: {
        "xs": "0 1px 2px rgba(0,0,0,0.05)",
        "sm": "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        "md": "0 4px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
        "lg": "0 12px 32px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)",
        "xl": "0 24px 56px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)",
        "red": "0 4px 14px rgba(200,16,46,0.2), 0 1px 3px rgba(200,16,46,0.1)",
        "inner": "inset 0 2px 4px rgba(0,0,0,0.04)",
        "ring": "0 0 0 3px rgba(200,16,46,0.12)",
      },
      animation: {
        "in": "fadeIn 0.5s ease-out both",
        "up": "slideUp 0.5s ease-out both",
        "up-1": "slideUp 0.5s 0.08s ease-out both",
        "up-2": "slideUp 0.5s 0.16s ease-out both",
        "up-3": "slideUp 0.5s 0.24s ease-out both",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
