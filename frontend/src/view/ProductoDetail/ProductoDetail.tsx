import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import type { Producto } from "../../types/Producto";

export const ProductoDetail = () => {
  const { id } = useParams<{ id: string }>();

  const [producto, setProducto] = useState<Producto | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProducto = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Producto>(
          `${import.meta.env.VITE_API_URL}/productos/${id}`
        );
        if (isMounted) {
          setProducto(response.data);
          setSelectedImage(response.data.imagen);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Error en la petición");
        } else {
          setError("Error desconocido");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (id) fetchProducto();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        Cargando producto...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <h2 className="text-2xl font-bold">Error</h2>
        <p className="mt-2 text-red-400">{error}</p>
        <Link to="/productos" className="mt-4 text-green-400 hover:underline">
          Volver a productos
        </Link>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <h2 className="text-2xl font-bold">Producto no encontrado</h2>
        <Link to="/productos" className="mt-4 text-green-400 hover:underline">
          Volver a productos
        </Link>
      </div>
    );
  }

  // ✅ Galería con imagen + imagen2
  const galeria = [producto.imagen, producto.imagen2].filter(Boolean);

  return (
    <section className="bg-black mt-28 min-h-screen text-white px-6 py-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Galería */}
        <div className="flex flex-row w-full max-w-2xl p-2 gap-4">
          <div className="flex flex-col gap-3">
            {galeria.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumb-${index}`}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-contain rounded-lg border-2 cursor-pointer transition
                  ${
                    selectedImage === img
                      ? "border-green-500 shadow-[0_0_10px_rgba(0,255,102,0.7)]"
                      : "border-transparent hover:border-green-400"
                  }`}
              />
            ))}
          </div>

          <div className="flex-1 flex items-center justify-center">
            <img
              src={selectedImage}
              alt={producto.nombre}
              className="w-full max-h-[700px] object-contain rounded-lg"
            />
          </div>
        </div>

        {/* Info producto */}
        <div className="flex flex-col gap-6">
          <h2 className="text-4xl font-bold leading-tight font-['Roboto_Condensed']">
            {producto.nombre}
          </h2>
          <p className="text-2xl text-white font-semibold">
            {producto.precio.toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
            })}
          </p>

          <p className="text-green-400 font-semibold">
            ¡Solo quedan {producto.stock.toLocaleString()} en stock!
          </p>

          <p className="text-gray-300 leading-relaxed">
            {producto.descripcion ||
              "Este producto es de alta calidad y cuenta con garantía oficial."}
          </p>

          <div className="flex flex-col gap-4">
            {/* ✅ Botón externo a Mercado Libre */}
            {producto.link && (
              <a
                href={producto.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-500 text-black px-4 py-3 rounded-lg hover:bg-yellow-600 transition text-center font-bold"
              >
                🛒 Comprar en Mercado Libre
              </a>
            )}

            {/* ✅ Botón WhatsApp */}
            {/* ✅ Botón WhatsApp */}
            <a
              href={`https://wa.me/5493794158714?text=${encodeURIComponent(
                `Hola! Quiero consultar por el producto: ${producto.nombre}\nLink: ${window.location.origin}/productos/${producto.id}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-center"
            >
              Consultar por WhatsApp
            </a>
          </div>

          <Link
            to="/productos"
            className="text-green-400 text-sm hover:underline mt-2"
          >
            Volver
          </Link>
        </div>
      </div>
    </section>
  );
};
