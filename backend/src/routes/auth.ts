import { Router } from "express";
import jwt from "jsonwebtoken";
import { requireAuth } from "../middleware/authMiddleware";

const router = Router();

// 🔑 Login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASS
  ) {
    // ✅ Si coincide → generar token
    const token = jwt.sign(
      { role: "admin", username },
      process.env.JWT_SECRET as string,
      { expiresIn: "2h" }
    );
    return res.json({ token });
  }

  return res.status(401).json({ error: "Credenciales inválidas" });
});

// 🔒 Verificar token
router.get("/verify", requireAuth, (req, res) => {
  res.json({ ok: true });
});

export default router;
