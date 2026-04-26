/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Layout surfaces (CSS vars — opacity modifiers NOT used on these) ──
        base:            "var(--color-base)",
        surface:         "var(--color-surface)",
        card:            "var(--color-card)",
        elevated:        "var(--color-elevated)",

        // ── Borders (CSS vars) ──────────────────────────────────────────────
        border:          "var(--color-border)",
        "border-subtle": "var(--color-border-subtle)",

        // ── Text (CSS vars) ─────────────────────────────────────────────────
        fg:    "var(--color-fg)",
        muted: "var(--color-muted)",
        dim:   "var(--color-dim)",

        // ── Brand & status — hex so bg-brand/10, text-success/80 etc. work ──
        brand:   "#3b82f6",  // blue-500
        success: "#34d399",  // emerald-400
        danger:  "#f87171",  // red-400
        amber:   "#fbbf24",  // amber-400
        violet:  "#a78bfa",  // violet-400
        cyan:    "#22d3ee",  // cyan-400
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};