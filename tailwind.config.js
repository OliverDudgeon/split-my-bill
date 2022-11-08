const defaultConfig = require('tailwindcss/defaultConfig');

/** @type {import('tailwindcss/types').Config} */
const config = {
  content: ['index.html', 'src/**/*.tsx'],
  theme: {
    fontFamily: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      sans: ['Inter', ...defaultConfig.theme.fontFamily.sans],
    },
  },
  experimental: { optimizeUniversalDefaults: true },
  // plugins: [formsPlugin]
};

module.exports = config;
