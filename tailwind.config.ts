import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: "#0E1116",
          raised: "#151A22",
          panel: "#181D26",
          overlay: "#1F2530",
        },
        line: {
          DEFAULT: "#262C38",
          soft: "#1B212B",
          strong: "#3A4152",
        },
        ink: {
          DEFAULT: "#E9ECF1",
          soft: "#AEB6C4",
          muted: "#747E90",
          faint: "#4B5262",
        },
        signal: {
          DEFAULT: "#E3963E",
          soft: "#F0B876",
          dim: "#8A5C28",
        },
        teal: {
          DEFAULT: "#49B3A6",
          soft: "#8FD2C8",
          dim: "#2C6E66",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "schematic-grid":
          "linear-gradient(to right, rgba(233,236,241,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(233,236,241,0.045) 1px, transparent 1px)",
        "schematic-grid-fine":
          "linear-gradient(to right, rgba(233,236,241,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(233,236,241,0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "28px 28px",
        "grid-fine": "8px 8px",
      },
      maxWidth: {
        content: "1180px",
      },
      borderRadius: {
        sm: "3px",
        DEFAULT: "5px",
        md: "7px",
        lg: "10px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
        "trace-flow": {
          to: { "stroke-dashoffset": "-28" },
        },
        "drift-a": {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)", opacity: "0.55" },
          "50%": { transform: "translate(7px, -9px) scale(1.4)", opacity: "1" },
        },
        "drift-b": {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)", opacity: "0.5" },
          "50%": { transform: "translate(-8px, 6px) scale(1.3)", opacity: "0.95" },
        },
        "drift-c": {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)", opacity: "0.6" },
          "50%": { transform: "translate(6px, 8px) scale(1.25)", opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        blink: "blink 2.4s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3.2s ease-in-out infinite",
        "trace-flow": "trace-flow 2.4s linear infinite",
        "drift-a": "drift-a 6s ease-in-out infinite",
        "drift-b": "drift-b 7.5s ease-in-out infinite",
        "drift-c": "drift-c 5.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
