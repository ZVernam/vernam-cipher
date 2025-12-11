import {defineConfig} from "vite";
import {dirname, resolve} from "node:path";
import {createHtmlPlugin as htmlPlugin} from "vite-plugin-html";
import chromeConfig from "./chrome/vite.config";

import {fileURLToPath} from 'url';

// __filename equivalent
const __filename = fileURLToPath(import.meta.url);

// __dirname equivalent
const __dirname = dirname(__filename);

console.log(__dirname); // directory of the current module

// Shared environment variables per platform
const platformEnv = {
  web: {PLATFORM: "web"},
  chrome: {PLATFORM: "chrome"},
  telegram: {PLATFORM: "telegram"},
};

export default defineConfig(({mode = 'web'}) => {
  if (mode === `chrome`) {
    return chromeConfig;
  }

  const env = {...platformEnv[mode]};

  const root = resolve(__dirname, `src`);

  return {
    define: Object.fromEntries(
      Object.entries(env).map(([k, v]) => [`process.env.${k}`, JSON.stringify(v)]),
    ),

    build: {
      root: root,
      rollupOptions: {
        input: {
          index: `${root}/index.html`,
        },
        output: {
          // Keep separate output directories per platform
          entryFileNames: ({name}) => `assets/${name}/[name]-[hash].js`,
          chunkFileNames: ({name}) => `assets/${name}/[name]-[hash].js`,
          assetFileNames: ({name}) => `assets/${name}/[name]-[hash][extname]`,
        },
      },
      outDir: "dist",
    },

    plugins: [
      htmlPlugin({
        inject: {
          data: {
            telegramScript:
              env.PLATFORM === "telegram"
                ? '<script src="https://telegram.org/js/telegram-web-app.js"></script>'
                : "",
          },
        },
      }),
    ],
  };

});
