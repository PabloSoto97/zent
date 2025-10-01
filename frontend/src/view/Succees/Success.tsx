import { Link } from "react-router-dom";
import { useCart } from "../../context/cartContext";

export const Success = () => {
  const { clearCart } = useCart();

  return (
    <section className="bg-black text-white min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-6">✅ Pago aprobado</h2>
      <p className="mb-4">
        ¡Gracias por tu compra! Te enviaremos la confirmación por email.
      </p>
      <Link
        to="/"
        onClick={clearCart} // 👈 limpiamos carrito al volver a la tienda
        className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Volver a la tienda
      </Link>
    </section>
  );
};
