/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0C2264',
          light: '#1a3a8f',
          dark: '#07163d',
        },
        redc: {
          DEFAULT: '#BE1A22',
          light: '#d42b33',
          dark: '#8f1219',
        },
        amber: {
          DEFAULT: '#F59E0B',
        },
      },
      fontFamily: {
        nepali: ['"Noto Sans Devanagari"', '"Hind"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        fadeSlide: {
          '0%': { opacity: 0, transform: 'translateX(30px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%':   { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideDown: {
          '0%':   { opacity: 0, transform: 'translateY(-8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideUp: {
          '0%':   { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%':   { opacity: 0, transform: 'scale(0.96)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
      },
      animation: {
        marquee:   'marquee 30s linear infinite',
        fadeSlide: 'fadeSlide 0.5s ease forwards',
        fadeIn:    'fadeIn 0.45s ease forwards',
        slideDown: 'slideDown 0.25s ease forwards',
        slideUp:   'slideUp 0.3s ease forwards',
        scaleIn:   'scaleIn 0.3s ease forwards',
      },
    },
  },
  plugins: [],
}
