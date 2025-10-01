// src/controllers/checkoutController.ts
import { Request, Response } from "express";
import { createPreferenceService } from "../services/checkoutService";
import { CheckoutPayload } from "../types/checkout";

export const createPreference = async (req: Request, res: Response) => {
  try {
    const { cart, envio, datos } = req.body as CheckoutPayload;

    if (!Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ error: "Carrito vacío o inválido" });
    }

    if (
      !datos ||
      !datos.nombre?.trim() ||
      !datos.email?.trim() ||
      !datos.cp?.trim()
    ) {
      return res
        .status(400)
        .json({ error: "Faltan datos obligatorios del comprador" });
    }

    const preference = await createPreferenceService({ cart, envio, datos });
    return res.json(preference);
  } catch (error) {
    console.error("❌ Error en checkoutController:", error);
    return res.status(500).json({ error: "No se pudo crear la preferencia" });
  }
};
