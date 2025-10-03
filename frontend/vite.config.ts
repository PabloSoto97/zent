import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "tailwindcss";
// import * as path from "path";

// Use Node.js __dirname directly in Vite config

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
  resolve: {
    alias: {
      "@": new URL("./src", import.meta.url).pathname,
    },
  },
  base: "/", // importante para rutas absolutas
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
