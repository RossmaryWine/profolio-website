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
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        body: ["var(--font-plex-sans)", "system-ui", "sans-serif"],
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
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        blink: "blink 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
