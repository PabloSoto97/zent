import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path"; // Asegúrate de que path se esté importando

// https://vitejs.dev/config/
export default defineConfig({
  // FIX: Forzar la ruta base a la raíz para Vercel
  // Esto debe hacer que los archivos se busquen en la raíz del dominio
  base: "/",

  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Si usas rutas absolutas, el alias debe estar bien configurado
      // Pero si no necesitas path, déjalo simple
      "@": path.resolve(__dirname, "src"),
    },
  },
  // La configuración de build no debería ser necesaria aquí si usas los defaults
});
