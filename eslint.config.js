import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
    rules: {
      "indent": ["error", 2],
      "quotes": ["error", "double"],
      "no-unused-vars": "warn",
      "no-console": "warn",
      "comma-dangle": ["error", "never"],
      "no-trailing-spaces": ["error"],
      "no-var": ["error"],
      "no-unused-vars": ["error"],
      "prefer-const": ["error"]
    }
  },
  pluginVue.configs["flat/essential"]
]);
