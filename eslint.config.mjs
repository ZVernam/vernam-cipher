// eslint.config.js

import {defineConfig} from "eslint/config";
import js from "@eslint/js";

export default defineConfig([
  {ignores: ['build', '**/dist']},
  {
    files: ["common/**/*.js", "chrome/**/*.js"],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        window: true,
        console: true,
        document: true,
        navigator: true,
        require: true,
        module: true,
        describe: true,
        it: true,
        before: true,
        after: true,
        beforeEach: true,
        afterEach: true,
        chrome: true,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-console': 'off',
    },
  },
]);
