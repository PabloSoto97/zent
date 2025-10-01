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
// 🔹 Rutas públicas
// ======================
app.use(express.static(path.join(__dirname, "../frontend-dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend-dist", "index.html"));
});
app.use("/auth", authRouter);
app.use("/productos", productosRouter);
app.use("/checkout", checkoutRouter);
app.use("/categorias", categoriasRoutes); // <- esta queda pública
app.use("/public", express.static("public"));

// ======================
// 🔹 Rutas privadas (panel admin)
// ======================
app.use("/admin/categorias", requireAuth, categoriasRoutes);
app.use("/admin/productos", requireAuth, productosRouter);
// 👆 solo se protegen las de admin, no las de cliente
// ======================
// 🔹 Start Server
// ======================
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
