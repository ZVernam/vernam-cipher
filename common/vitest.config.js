// vitest.config.js
import {defineConfig} from "vitest/config";
import {dirname, resolve} from "node:path";

import {fileURLToPath} from 'node:url';

// __filename equivalent
const __filename = fileURLToPath(import.meta.url);

// __dirname equivalent
const __dirname = dirname(__filename);

export default defineConfig({
  test: {
    include: [
      "test/**/*.js",
      "lib/test/**/*.js",
    ],
    environment: "node",        // default; change per-file with /** @vitest-environment jsdom */
    globals: true,              // enable describe/it/expect without imports
    coverage: {
      reporter: ["text", "html"],
    },
  },

  resolve: {
    alias: {
      "@common": resolve(__dirname, "common/src"),
      "@web": resolve(__dirname, "web/src"),
    },
  },

  root: ".", // required because your vite.config.js uses custom root
});
