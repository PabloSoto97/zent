import { Link } from "react-router-dom";

export const Pending = () => {
  return (
    <section className="bg-black text-white min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-6">⏳ Pago pendiente</h2>
      <p className="mb-4">
        Tu pago está en proceso. Te avisaremos cuando se acredite.
      </p>
      <Link
        to="/"
        className="bg-yellow-600 px-4 py-2 rounded hover:bg-yellow-700 transition"
      >
        Volver a la tienda
      </Link>
    </section>
  );
};
