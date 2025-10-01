import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

// 👇 carga variables desde backend/.env
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Rutas
import authRouter from "./routes/auth";
import productosRouter from "./routes/productos";
import checkoutRouter from "./routes/checkout";
import categoriasRoutes from "./routes/categorias";

// Middleware
import { requireAuth } from "./middleware/authMiddleware";

const app = express();
app.use(cors());
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
// 🔹 Servir frontend
// ======================
app.use(express.static(path.join(__dirname, "../frontend-dist")));
app.get(/^\/(?!api).*$/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend-dist/index.html"));
});

// ======================
// 🔹 Start Server
// ======================
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
