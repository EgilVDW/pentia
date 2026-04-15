import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/styles/base/reset" as *;
          @use "@/assets/styles/abstracts/colors" as *;
          @use "@/assets/styles/abstracts/mixins" as *;
          @use "@/assets/styles/abstracts/typography" as *;
          @use "@/assets/styles/abstracts/variables" as *;
          @use "@/assets/styles/base/global" as *;`,
      },
    },
  },
});
