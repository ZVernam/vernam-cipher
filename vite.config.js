import {defineConfig} from "vite";
import {resolve} from "path";
import {createHtmlPlugin as htmlPlugin} from "vite-plugin-html";
import chromeConfig from "./chrome/vite.config";

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

  return {
    define: Object.fromEntries(
      Object.entries(env).map(([k, v]) => [`process.env.${k}`, JSON.stringify(v)]),
    ),

    build: {
      rollupOptions: {
        input: {
          web: resolve(__dirname, "html/web.html"),
          chrome: resolve(__dirname, "html/chrome.html"),
          telegram: resolve(__dirname, "html/telegram.html"),
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
