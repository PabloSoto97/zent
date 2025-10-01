"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkoutController_1 = require("../controllers/checkoutController");
const router = (0, express_1.Router)();
// ✅ Route → Controller
router.post("/", checkoutController_1.createPreference);
exports.default = router;
