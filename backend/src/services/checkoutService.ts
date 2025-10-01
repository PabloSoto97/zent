// src/services/checkoutService.ts
import { MercadoPagoConfig, Preference } from "mercadopago";
import { CheckoutPayload } from "../types/checkout";

// 🔎 Debug: asegurate de que el token se lea bien

if (!process.env.MP_ACCESS_TOKEN) {
  throw new Error("❌ MP_ACCESS_TOKEN no está definido en el .env");
}

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN as string,
});

export const createPreferenceService = async ({
  cart,
  envio,
  datos,
}: CheckoutPayload) => {
  const preference = new Preference(client);

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
