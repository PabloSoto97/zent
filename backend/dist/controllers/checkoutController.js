"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPreference = void 0;
const checkoutService_1 = require("../services/checkoutService");
const createPreference = async (req, res) => {
    try {
        const { cart, envio, datos } = req.body;
        if (!Array.isArray(cart) || cart.length === 0) {
            return res.status(400).json({ error: "Carrito vacío o inválido" });
        }
        if (!datos ||
            !datos.nombre?.trim() ||
            !datos.email?.trim() ||
            !datos.cp?.trim()) {
            return res
                .status(400)
                .json({ error: "Faltan datos obligatorios del comprador" });
        }
        const preference = await (0, checkoutService_1.createPreferenceService)({ cart, envio, datos });
        return res.json(preference);
    }
    catch (error) {
        console.error("❌ Error en checkoutController:", error);
        return res.status(500).json({ error: "No se pudo crear la preferencia" });
    }
};
exports.createPreference = createPreference;
