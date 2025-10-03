import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  // FIX: Establecer la ruta base a la raíz del dominio para un despliegue correcto en Vercel
  base: "./",

  plugins: [react(), tailwindcss()],
});
