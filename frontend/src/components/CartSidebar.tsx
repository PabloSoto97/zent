import { useCart } from "../context/cartContext";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

type CartSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const { state, removeFromCart } = useCart();

  // Calcular total
  const total = state.cart.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-black text-white shadow-lg transform transition-transform duration-300 z-50
      ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-lg font-bold">Tu carrito</h2>
        <button onClick={onClose}>
          <X className="w-6 h-6 text-gray-300 hover:text-white" />
        </button>
      </div>

      {/* Items */}
      <div className="p-4 flex-1 overflow-y-auto">
        {state.cart.length === 0 ? (
          <p className="text-gray-400">Tu carrito está vacío</p>
        ) : (
          <ul className="space-y-4">
            {state.cart.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-2"
              >
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  className="w-14 h-14 object-contain rounded"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold">{item.nombre}</p>
                  <p className="text-green-400 text-sm">
                    {item.precio.toLocaleString("es-AR", {
                      style: "currency",
                      currency: "ARS",
                    })}{" "}
                    x {item.cantidad}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400 hover:text-red-600"
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <p className="flex justify-between text-lg font-bold">
          <span>Total:</span>
          <span>
            {total.toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
            })}
          </span>
        </p>
        <Link
          to="/cart"
          onClick={onClose}
          className="block bg-green-600 hover:bg-green-700 transition text-center text-white py-2 mt-4 rounded-lg"
        >
          Ir al carrito
        </Link>
      </div>
    </div>
  );
};
