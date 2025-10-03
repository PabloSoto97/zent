import { useCart } from "../../context/cartContext";
import { useState } from "react";
import axios from "axios";
import { calcularEnvio } from "../../helpers/calcularEnvio";
import type { EnvioResult } from "../../helpers/calcularEnvio";
import { validarDatos } from "../../helpers/validarDatos";

export const Cart = () => {
  const { state, increaseQty, decreaseQty, removeFromCart } = useCart();
  const [step, setStep] = useState<"cart" | "datos" | "envio" | "pago">("cart");
  const [userData, setUserData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    cp: "",
    localidad: "",
    provincia: "",
  });
  const [cotizacion, setCotizacion] = useState<EnvioResult | null>(null);
  const [errores, setErrores] = useState<string[]>([]);

  const subtotal = state.cart.reduce(
    (acc, item) => acc + item.precio * (item.cantidad || 1),
    0
  );

  const calcularEnvioHandler = () => {
    const erroresValidacion = validarDatos(userData);
    if (erroresValidacion.length > 0) {
      setErrores(erroresValidacion);
      return;
    }

    setErrores([]);
    const envio = calcularEnvio({
      localidad: userData.localidad,
      provincia: userData.provincia,
    });

    setCotizacion(envio);
    setStep("envio");
  };

  const pagar = async () => {
    if (!cotizacion) {
      alert("Primero calcula el envío antes de pagar 🚚");
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/checkout`, {
        cart: state.cart,
        envio: cotizacion?.tipo === "fijo" ? cotizacion.costo : 0,
        datos: userData,
      });

      if (res.data?.init_point) {
        // 👉 redirige al checkout de MercadoPago
        window.location.href = res.data.init_point;
      } else {
        alert("No se pudo iniciar el pago, intenta nuevamente.");
      }
    } catch (err: any) {
      console.error("❌ Error al crear preferencia", err);
      alert("Error al procesar el pago. Revisa la consola.");
    }
  };

  const handleChange = (field: string, value: string) => {
    setUserData({ ...userData, [field]: value });
  };

  // --- Progress bar labels ---
  const steps = ["🛒 Carrito", "📋 Datos", "🚚 Envío", "💳 Pago"];
  const stepIndex = steps.findIndex((_, i) => {
    if (step === "cart" && i === 0) return true;
    if (step === "datos" && i === 1) return true;
    if (step === "envio" && i === 2) return true;
    if (step === "pago" && i === 3) return true;
    return false;
  });

  return (
    <section className="bg-black text-white min-h-screen mt-20 px-6 py-12">
      {/* Progress bar */}
      <div className="max-w-4xl mx-auto mb-10 mt-11">
        <div className="flex items-center justify-between">
          {steps.map((label, i) => (
            <div key={i} className="flex-1 flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm ${
                  i <= stepIndex
                    ? "bg-green-600 text-white"
                    : "bg-gray-700 text-gray-400"
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`ml-2 text-sm font-semibold ${
                  i === stepIndex ? "text-green-400" : "text-gray-400"
                }`}
              >
                {label}
              </span>
              {i < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    i < stepIndex ? "bg-green-600" : "bg-gray-700"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Columna izquierda */}
        <div className="lg:col-span-2">
          {step === "cart" && (
            <>
              <h2 className="text-3xl font-bold mb-6">🛒 Tu carrito</h2>
              {state.cart.length === 0 ? (
                <p className="text-gray-400">No hay productos en el carrito</p>
              ) : (
                <div className="space-y-4">
                  {state.cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between bg-gray-900 p-4 rounded-lg shadow"
                    >
                      {item.imagen && (
                        <img
                          src={item.imagen}
                          alt={item.nombre}
                          className="w-16 h-16 object-cover rounded mr-4"
                        />
                      )}
                      <div className="flex-1">
                        <p className="font-semibold">{item.nombre}</p>
                        <p className="text-green-400">
                          {item.precio.toLocaleString("es-AR", {
                            style: "currency",
                            currency: "ARS",
                          })}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={() => decreaseQty(item.id)}
                          className="bg-gray-700 px-2 py-1 rounded hover:bg-gray-600"
                        >
                          -
                        </button>
                        <span className="mx-3">{item.cantidad || 1}</span>
                        <button
                          onClick={() => increaseQty(item.id)}
                          className="bg-gray-700 px-2 py-1 rounded hover:bg-gray-600"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:underline ml-4"
                      >
                        Quitar
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={() => setStep("datos")}
                    className="bg-green-600 px-6 py-3 rounded-lg font-bold mt-6 hover:bg-green-700 transition w-full"
                  >
                    Finalizar compra →
                  </button>
                </div>
              )}
            </>
          )}

          {step === "datos" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">
                📋 Datos del destinatario
              </h2>

              {errores.length > 0 && (
                <div className="bg-red-600 text-white p-3 rounded mb-4">
                  <ul className="list-disc pl-5 space-y-1">
                    {errores.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(userData).map(([field, value]) => (
                  <input
                    key={field}
                    className={`w-full p-3 rounded text-white focus:outline-none ${
                      errores.some((e) =>
                        e.toLowerCase().includes(field.toLowerCase())
                      )
                        ? "border-2 border-red-500"
                        : "border border-gray-300"
                    }`}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={value}
                    onChange={(e) => handleChange(field, e.target.value)}
                  />
                ))}
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setStep("cart")}
                  className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
                >
                  ← Volver
                </button>
                <button
                  onClick={calcularEnvioHandler}
                  className="bg-green-600 px-6 py-2 rounded hover:bg-green-700"
                >
                  Calcular envío →
                </button>
              </div>
            </div>
          )}

          {step === "envio" && cotizacion && (
            <div>
              <h2 className="text-2xl font-bold mb-6">🚚 Costo de envío</h2>
              <p className="mb-4">{cotizacion.mensaje}</p>
              {cotizacion.tipo !== "a_convenir" && (
                <p className="text-green-400 font-bold text-xl">
                  {cotizacion.costo.toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  })}
                </p>
              )}
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setStep("datos")}
                  className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
                >
                  ← Volver
                </button>
                <button
                  onClick={() => setStep("pago")}
                  className="bg-green-600 px-6 py-2 rounded hover:bg-green-700"
                >
                  Continuar al pago →
                </button>
              </div>
            </div>
          )}

          {step === "pago" && cotizacion && (
            <div>
              <h2 className="text-2xl font-bold mb-6">💳 Pago</h2>
              <p className="text-xl mb-6">
                Total:{" "}
                <span className="text-green-400 font-bold">
                  {(
                    subtotal +
                    (cotizacion?.tipo === "fijo" ? cotizacion.costo : 0)
                  ).toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  })}
                </span>
              </p>
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setStep("envio")}
                  className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
                >
                  ← Volver
                </button>

                <button
                  onClick={pagar}
                  className="bg-green-600 px-6 py-2 rounded hover:bg-green-700"
                >
                  Pagar con Mercado Pago
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Columna derecha: Resumen */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg h-fit sticky top-24">
          <h3 className="text-xl font-bold mb-4">Resumen de tu compra</h3>
          <div className="space-y-3">
            {state.cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center">
                  {item.imagen && (
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="w-12 h-12 object-cover rounded mr-3"
                    />
                  )}
                  <p className="text-sm">{item.nombre}</p>
                </div>
                <p className="text-sm">
                  {item.cantidad || 1} ×{" "}
                  {item.precio.toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  })}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-700 mt-4 pt-4 space-y-2 text-sm">
            <p className="flex justify-between">
              <span>Subtotal</span>
              <span>
                {subtotal.toLocaleString("es-AR", {
                  style: "currency",
                  currency: "ARS",
                })}
              </span>
            </p>
            {cotizacion && (
              <p className="flex justify-between">
                <span>Envío</span>
                <span>
                  {cotizacion.tipo === "a_convenir"
                    ? "A convenir"
                    : cotizacion.costo.toLocaleString("es-AR", {
                        style: "currency",
                        currency: "ARS",
                      })}
                </span>
              </p>
            )}
            <p className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-green-400">
                {(
                  subtotal +
                  (cotizacion?.tipo === "fijo" ? cotizacion.costo : 0)
                ).toLocaleString("es-AR", {
                  style: "currency",
                  currency: "ARS",
                })}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
