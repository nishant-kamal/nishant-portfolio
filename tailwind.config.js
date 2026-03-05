/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // src/ directory structure (Next.js App Router default)
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    // Flat structure fallback (without src/)
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Maps to CSS variables set in globals.css :root
        // Allows using font-sans / font-mono as Tailwind utilities
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      colors: {
        brand: {
          cyan:   "#38bdf8",
          purple: "#a78bfa",
          green:  "#34d399",
          orange: "#fb923c",
        },
        surface: {
          DEFAULT: "#020617",
          card:    "#0f172a",
        },
      },
      animation: {
        "spin-slow":    "spin 20s linear infinite",
        "spin-reverse": "spin 25s linear infinite reverse",
        "ping-slow":    "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [],
};
