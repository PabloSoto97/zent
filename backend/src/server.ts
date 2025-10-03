import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

// 👇 carga variables desde backend/.env
if (process.env.NODE_ENV !== "production") {
  // Asegúrate de que tienes 'dotenv' instalado si usas require
  // Si usas require('dotenv').config, no hace falta el require de arriba
  require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
}

// Rutas (Asegúrate de que tus rutas de 'upload' de imágenes estén dentro de 'productosRouter' o aquí)
import authRouter from "./routes/auth";
import productosRouter from "./routes/productos";
import checkoutRouter from "./routes/checkout";
import categoriasRoutes from "./routes/categorias";

// Middleware
import { requireAuth } from "./middleware/authMiddleware";

const app = express();

// ======================
// 🔹 CORS (SOLUCIÓN COMPLETA para Vercel)
// ======================
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Frontend en dev
      "https://zentcommerce.vercel.app", // Dominio de Producción (el que está funcionando)
      // Puedes añadir aquí otros dominios de Vercel Preview si los tienes.
    ],
    // 💡 FIX: Incluir explícitamente todos los métodos, incluyendo OPTIONS (preflight requests)
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
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
// Nota: La ruta de subida de imágenes (upload) debe estar aquí o dentro de productosRouter
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
