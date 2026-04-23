import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";

export default defineConfig([
  js.configs.recommended,
  pluginVue.configs["flat/essential"],
  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    plugins: { js },
    languageOptions: { globals: globals.browser },
    rules: {
      indent: ["error", 2],
      quotes: ["error", "double"],
      "no-console": "warn",
      "comma-dangle": ["error", "never"],
      "no-trailing-spaces": ["error"],
      "no-var": ["error"],
      "no-unused-vars": ["error"],
      "prefer-const": ["error"],
      "vue/multi-word-component-names": "off"
    }
  }
]);
