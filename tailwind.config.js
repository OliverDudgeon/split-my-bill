const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['index.html', 'src/**/*.tsx'],
  theme: {
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
    },
  },
  // plugins: [formsPlugin]
};

module.exports = config;
