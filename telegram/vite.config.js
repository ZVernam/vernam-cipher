import {defineConfig} from "vite";
import {dirname} from "node:path";
import {viteStaticCopy} from "vite-plugin-static-copy";

import {fileURLToPath} from 'url';

// __filename equivalent
const __filename = fileURLToPath(import.meta.url);

// __dirname equivalent
const __dirname = dirname(__filename);

console.log(__dirname); // directory of the current module

export default defineConfig({
    root: __dirname, // source folder
    modulePreload: false,
    base: "./", // important: makes all URLs relative
    build: {
      outDir: `${__dirname}/dist`,
      emptyOutDir: true,
      rollupOptions: {
        input: {
          index: `${__dirname}/index.html`,
        },
        output: {
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
      },
    },
    plugins: [
      // Copy static files (manifest.json, icons) to dist
      viteStaticCopy({
        targets: [
          {src: `${__dirname}/../common/src/icons/*.*`, dest: '.'},
        ],
      }),
    ],
  },
);
