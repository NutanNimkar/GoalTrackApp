/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: '#0f0f0f',
        surface: '#1a1a1a',
        'surface-2': '#222222',
        'surface-hover': '#2a2a2a',
        sidebar: '#111111',
        accent: '#B3E6A9',
        'accent-dim': '#7ABF6D',
        border: 'rgba(255,255,255,0.08)',
        'border-strong': 'rgba(255,255,255,0.15)',
        text: {
          primary: '#e5e5e5',
          secondary: '#8a8a8a',
          muted: '#555555',
        },
        danger: '#f87171',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
