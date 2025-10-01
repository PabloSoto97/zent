import { Router } from "express";
import { createPreference } from "../controllers/checkoutController";

const router = Router();

// ✅ Route → Controller
router.post("/", createPreference);

export default router;
