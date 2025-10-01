"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPreferenceService = void 0;
// src/services/checkoutService.ts
const mercadopago_1 = require("mercadopago");
// 🔎 Debug: asegurate de que el token se lea bien
if (!process.env.MP_ACCESS_TOKEN) {
    throw new Error("❌ MP_ACCESS_TOKEN no está definido en el .env");
}
const client = new mercadopago_1.MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN,
});
const createPreferenceService = async ({ cart, envio, datos, }) => {
    const preference = new mercadopago_1.Preference(client);
    const result = await preference.create({
        body: {
            items: cart.map((item, index) => ({
                id: String(index + 1),
                title: item.nombre,
                unit_price: Number(item.precio),
                quantity: Number(item.cantidad),
                picture_url: item.imagen,
            })),
            shipments: {
                cost: envio || 0,
                mode: "not_specified",
            },
            payer: {
                name: datos.nombre,
                email: datos.email,
                phone: { number: datos.telefono },
                address: {
                    street_name: datos.direccion,
                    zip_code: datos.cp,
                },
            },
        },
    });
    return result;
};
exports.createPreferenceService = createPreferenceService;
