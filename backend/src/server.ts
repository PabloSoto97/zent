import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

// 👇 carga variables desde backend/.env
if (process.env.NODE_ENV !== "production") {
  // Asegúrate de que tienes 'dotenv' instalado si usas require
  require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
}

// Rutas
import authRouter from "./routes/auth";
import productosRouter from "./routes/productos";
import checkoutRouter from "./routes/checkout";
import categoriasRoutes from "./routes/categorias";

// Middleware
import { requireAuth } from "./middleware/authMiddleware";

const app = express();

// ======================
// 💡 FIX 1: Habilitar el proxy para cookies seguras en producción
// Esto es necesario porque estás detrás de un proxy (Render, Heroku, etc.)
// y es esencial para que las cookies Secure funcionen.
// ======================
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1); // Confía en el primer proxy (Render/Vercel)
}

// ======================
// 🔹 CORS (CONFIGURACIÓN FINAL para Vercel/Producción)
// ======================
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Frontend en dev
      "https://zentcommerce.vercel.app", // Dominio de Producción
    ],
    // FIX: Incluir explícitamente todos los métodos
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true, // Necesario para enviar cookies
  })
);

app.use(express.json());

// ======================
// 🔹 Rutas API públicas
// ======================
app.use("/api/auth", authRouter);
app.use("/api/productos", productosRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/categorias", categoriasRoutes);

// 🔹 Rutas API privadas (panel admin)
app.use("/api/admin/categorias", requireAuth, categoriasRoutes);
app.use("/api/admin/productos", requireAuth, productosRouter);

// ======================
// 🔹 Endpoint health (para UptimeRobot)
// ======================
app.get("/health", (req, res) => {
  res.send("OK");
});

// ======================
// 🔹 Start Server
// ======================
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
