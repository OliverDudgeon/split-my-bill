/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
    src: { url: '/dist' },
    public: { url: '/', static: true },
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    [
      '@snowpack/plugin-typescript',
      {
        /* Yarn PnP workaround: see https://www.npmjs.com/package/@snowpack/plugin-typescript */
        ...(process.versions.pnp ? { tsc: 'yarn pnpify tsc' } : {}),
      },
    ],
    '@snowpack/plugin-postcss',
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    bundle: true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    tailwindConfig: './tailwind.config.js',
    open: 'none',
  },
  buildOptions: {
    baseUrl: '/split-my-bill',
    jsxInject: "import React from 'react'",
    // metaUrlPath: '/dist',
  },
};
