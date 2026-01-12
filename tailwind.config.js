/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      animationDelay: {
        '150': '150ms',
        '200': '200ms',
        '400': '400ms',
        '600': '600ms',
        '700': '700ms',
        '800': '800ms',
      },
      transitionDelay: {
        '700': '700ms',
      },
    },
  },
  plugins: [
    // Plugin to support animation-delay utilities
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'animation-delay': (value) => {
            return {
              'animation-delay': value,
            };
          },
        },
        {
          values: theme('animationDelay'),
        }
      );
    },
  ],
};
