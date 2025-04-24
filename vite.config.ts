/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  test: {
    // <--- Aquí defines la configuración de Vitest
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/_test/setupTests.ts",
  },
});
