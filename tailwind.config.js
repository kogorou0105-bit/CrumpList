/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'cursive': ['Caveat', 'cursive', 'sans-serif'],
      },
      height: {
        '18': '4.5rem',
      },
      scale: {
        '102': '1.02',
        '120': '1.2',
        '135': '1.35',
      },
      spacing: {
        '18': '4.5rem',
      },
      boxShadow: {
        '2xl': '0 20px 40px rgba(0, 0, 0, 0.1)',
        '3xl': '0 25px 50px rgba(0, 0, 0, 0.15)',
        '4xl': '0 30px 60px rgba(0, 0, 0, 0.15), 0 0 0 2px rgba(255, 255, 255, 1)',
      },
      backdropBlur: {
        'xl': '20px',
      },
      animation: {
        'staggerPop': 'staggerPop 0.4s forwards',
      },
      keyframes: {
        staggerPop: {
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          }
        }
      }
    },
  },
  plugins: [],
}