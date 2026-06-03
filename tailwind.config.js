/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './posts/**/*.{js,jsx}',
    './src_vite_archive/**/*.{js,jsx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Theme-aware semantic colors (defined via CSS vars in globals.css)
        // Use these in new code; existing slate/electric/white still work for backwards-compat.
        fg: 'rgb(var(--fg) / <alpha-value>)',
        'fg-muted': 'rgb(var(--fg-muted) / <alpha-value>)',
        'fg-subtle': 'rgb(var(--fg-subtle) / <alpha-value>)',
        bg: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        'surface-elevated': 'rgb(var(--surface-elevated) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-strong': 'rgb(var(--accent-strong) / <alpha-value>)',
        'accent-fg': 'rgb(var(--accent-fg) / <alpha-value>)',
        'line-subtle': 'rgb(var(--line-subtle) / <alpha-value>)',
        tint: 'rgb(var(--tint) / <alpha-value>)',

        // Legacy colors kept for hardcoded references that still exist in JSX.
        // These are intentionally STATIC values matching the original dark theme.
        ink: { 950: '#070b18', 900: '#0b1224', 800: '#111a31', 700: '#1a2542' },
        electric: { 400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7' },
      },
      boxShadow: {
        glow: '0 0 0 1px rgb(var(--accent) / 0.25), 0 10px 40px -10px rgb(var(--accent) / 0.4)',
      },
    },
  },
  plugins: [],
};
