import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import svgLoader from "vite-svg-loader";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), svgLoader()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/styles/base/reset" as *;
          @use "@/assets/styles/abstracts/colors" as *;
          @use "@/assets/styles/abstracts/typography" as *;
          @use "@/assets/styles/abstracts/variables" as *;
          @use "@/assets/styles/base/global" as *;`,
      },
    },
  },
});
