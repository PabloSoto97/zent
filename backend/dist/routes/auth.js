"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// 🔑 Login
router.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username === process.env.ADMIN_USER &&
        password === process.env.ADMIN_PASS) {
        // ✅ Si coincide → generar token
        const token = jsonwebtoken_1.default.sign({ role: "admin", username }, process.env.JWT_SECRET, { expiresIn: "2h" });
        return res.json({ token });
    }
    return res.status(401).json({ error: "Credenciales inválidas" });
});
// 🔒 Verificar token
router.get("/verify", authMiddleware_1.requireAuth, (req, res) => {
    res.json({ ok: true });
});
exports.default = router;
