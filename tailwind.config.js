/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './posts/**/*.{js,jsx}',
    './src_vite_archive/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: { 950: '#070b18', 900: '#0b1224', 800: '#111a31', 700: '#1a2542' },
        electric: { 400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7' },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(56,189,248,.25), 0 10px 40px -10px rgba(56,189,248,.4)',
      },
    },
  },
  plugins: [],
};
