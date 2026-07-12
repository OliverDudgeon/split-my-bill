import { copyFileSync, mkdirSync, readdirSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

import eslintPlugin from '@nabla/vite-plugin-eslint';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import type { Plugin } from 'vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

const require = createRequire(import.meta.url);
const ocrLanguages = ['eng'];

interface OcrAsset {
  fileName: string;
  sourcePath: string;
}

function getOcrAssets(): OcrAsset[] {
  const tesseractDirectory = path.dirname(require.resolve('tesseract.js/package.json'));
  const coreDirectory = path.dirname(
    require.resolve('tesseract.js-core/package.json', { paths: [tesseractDirectory] }),
  );

  return [
    {
      fileName: 'ocr/worker.min.js',
      sourcePath: path.join(tesseractDirectory, 'dist', 'worker.min.js'),
    },
    ...ocrLanguages.map((language) => ({
      fileName: `ocr/lang/${language}.traineddata.gz`,
      sourcePath: require.resolve(
        `@tesseract.js-data/${language}/4.0.0/${language}.traineddata.gz`,
      ),
    })),
    ...readdirSync(coreDirectory)
      .filter((fileName) => fileName.startsWith('tesseract-core'))
      .map((fileName) => ({
        fileName: `ocr/core/${fileName}`,
        sourcePath: path.join(coreDirectory, fileName),
      })),
  ];
}

function getContentType(fileName: string): string {
  if (fileName.endsWith('.wasm')) {
    return 'application/wasm';
  }
  if (fileName.endsWith('.gz')) {
    return 'application/gzip';
  }
  return 'text/javascript';
}

function ocrAssetsPlugin(): Plugin {
  const assets = getOcrAssets();
  let outDirectory = 'dist';

  return {
    name: 'ocr-assets',
    configResolved(config) {
      outDirectory = path.resolve(config.root, config.build.outDir);
    },
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const asset = assets.find(({ fileName }) => request.url?.endsWith(`/${fileName}`));

        if (!asset) {
          next();
          return;
        }

        response.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        response.setHeader('Content-Type', getContentType(asset.fileName));
        response.end(readFileSync(asset.sourcePath));
      });
    },
    writeBundle() {
      for (const asset of assets) {
        const outputPath = path.join(outDirectory, asset.fileName);
        mkdirSync(path.dirname(outputPath), { recursive: true });
        copyFileSync(asset.sourcePath, outputPath);
      }
    },
  };
}

export default defineConfig(() => ({
  base: '/split-my-bill/',
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tailwindcss(),
    react(),
    ocrAssetsPlugin(),
    eslintPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globIgnores: ['**/ocr/**'],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.includes('/ocr/'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'split-my-bill-ocr-assets',
              expiration: {
                maxEntries: 32,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
        ],
      },
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
