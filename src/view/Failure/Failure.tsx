import { Link } from "react-router-dom";

export const Failure = () => {
  return (
    <section className="bg-black text-white min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-6">❌ Pago rechazado</h2>
      <p className="mb-4">Hubo un problema con tu pago. Intenta nuevamente.</p>
      <Link
        to="/cart"
        className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Volver al carrito
      </Link>
    </section>
  );
};
