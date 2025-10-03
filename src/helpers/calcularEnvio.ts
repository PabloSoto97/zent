// src/helpers/calcularEnvio.ts
export type EnvioTipo = "gratis" | "fijo" | "a_convenir";

export interface EnvioResult {
  tipo: EnvioTipo;
  costo: number; // monto en pesos (0 si gratis o a_convenir)
  mensaje: string;
}

/**
 * Normaliza texto para comparar (quita mayúsculas y diacríticos).
 */
const normalize = (s: string) =>
  s
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // elimina tildes

interface UserLoc {
  localidad?: string;
  provincia?: string;
}

/**
 * Reglas:
 * - Corrientes capital (localidad "corrientes" y provincia "corrientes") => gratis
 * - Chaco: localidades "resistencia" o "barranqueras" => $4000 fijo
 * - Resto => a_convenir
 */
export const calcularEnvio = (data: UserLoc): EnvioResult => {
  const localidad = normalize(data.localidad || "");
  const provincia = normalize(data.provincia || "");

  // Caso 1: Corrientes capital
  if (localidad === "corrientes" && provincia === "corrientes") {
    return {
      tipo: "gratis",
      costo: 0,
      mensaje: "Envío gratis en Corrientes Capital 🚚",
    };
  }

  // Caso 2: Chaco (Resistencia o Barranqueras)
  if (
    provincia === "chaco" &&
    (localidad === "resistencia" || localidad === "barranqueras")
  ) {
    return {
      tipo: "fijo",
      costo: 4000,
      mensaje: "Envío a Chaco: $4.000 de recargo fijo 🚚",
    };
  }

  // Caso 3: resto del país
  return {
    tipo: "a_convenir",
    costo: 0,
    mensaje: "El costo de envío se coordina después de la compra 📦",
  };
};
