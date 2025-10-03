import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

// 👇 carga variables desde backend/.env
if (process.env.NODE_ENV !== "production") {
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
// 🔹 CORS (IMPORTANTE para Vercel)
// ======================
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Frontend en dev
      "https://TU-FRONTEND.vercel.app", // 🔹 reemplazar con el dominio de tu Vercel
    ],
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
