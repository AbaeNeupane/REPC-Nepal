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
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        fadeSlide: 'fadeSlide 0.5s ease forwards',
      },
    },
  },
  plugins: [],
}
