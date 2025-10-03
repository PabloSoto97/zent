import { Link } from "react-router-dom";

interface cardProps {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  categoria?: string;
}

export const Card = ({ id, nombre, precio, imagen }: cardProps) => {
  const precioFormateado = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2, // en este caso, mejor con decimales estilo tienda
  }).format(precio);

  return (
    <div className="flex flex-col items-center w-full max-w-xs">
      {/* Imagen como link */}
      <Link to={`/productos/${id}`} className="block w-full overflow-hidden">
        <img
          className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105 cursor-pointer"
          src={imagen}
          alt={nombre}
        />
      </Link>

      {/* Nombre */}
      <Link to={`/productos/${id}`}>
        <h5 className="mt-2 text-sm font-semibold tracking-wide text-center text-red-500 uppercase hover:underline cursor-pointer">
          {nombre}
        </h5>
      </Link>

      {/* Precio */}
      <span className="mt-1 text-base font-medium text-white">
        {precioFormateado}
      </span>
    </div>
  );
};
