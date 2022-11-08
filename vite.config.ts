import eslintPlugin from '@nabla/vite-plugin-eslint';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(() => ({
  optimizeDeps: {
    disabled: false,
  },
  build: {
    commonjsOptions: {
      include: [],
    },
  },
  base: '/split-my-bill/',
  plugins: [
    tsconfigPaths(),
    react(),
    eslintPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Split My Bill',
        short_name: 'Split My Bill',
        theme_color: '#BD34FE',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
}));
