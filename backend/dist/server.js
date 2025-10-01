"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// 👇 carga variables desde backend/.env
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
// Rutas
const auth_1 = __importDefault(require("./routes/auth"));
const productos_1 = __importDefault(require("./routes/productos"));
const checkout_1 = __importDefault(require("./routes/checkout"));
const categorias_1 = __importDefault(require("./routes/categorias"));
// Middleware
const authMiddleware_1 = require("./middleware/authMiddleware");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// ======================
// 🔹 Rutas públicas
// ======================
app.use("/auth", auth_1.default);
app.use("/productos", productos_1.default);
app.use("/checkout", checkout_1.default);
app.use("/categorias", categorias_1.default); // <- esta queda pública
app.use("/public", express_1.default.static("public"));
// ======================
// 🔹 Rutas privadas (panel admin)
// ======================
app.use("/admin/categorias", authMiddleware_1.requireAuth, categorias_1.default);
app.use("/admin/productos", authMiddleware_1.requireAuth, productos_1.default);
// 👆 solo se protegen las de admin, no las de cliente
// ======================
// 🔹 Start Server
// ======================
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
