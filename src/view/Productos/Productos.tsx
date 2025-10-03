import { useState, useEffect } from "react";
import styles from "./Productos.module.css";
import { ProductFilters } from "../../components/ProductFilters";
import { CardContainers } from "../../components/CardContainers";
import axios from "axios";

interface Categoria {
  id: number;
  nombre: string;
}

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  categoria: Categoria;
}

export const Productos = () => {
  const [orden, setOrden] = useState("asc");
  const [categoria, setCategoria] = useState("Todas");
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const productosFiltrados =
    categoria === "Todas"
      ? productos
      : productos.filter((p) => p.categoria.nombre === categoria);

  const productosOrdenados = [...productosFiltrados].sort((a, b) =>
    orden === "asc" ? a.precio - b.precio : b.precio - a.precio
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [productosRes, categoriasRes] = await Promise.all([
          axios.get<Producto[]>(`${import.meta.env.VITE_API_URL}/productos`),
          axios.get<Categoria[]>(`${import.meta.env.VITE_API_URL}/categorias`),
        ]);

        setProductos(productosRes.data);
        setCategorias(categoriasRes.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError("Error desconocido");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="pt-36 pb-8 bg-black">
      <div className="w-full p-4">
        <h2 className={styles.titulo}>Productos</h2>

        <div className="flex flex-col md:flex-row md:items-start md:gap-6">
          <aside className="mb-4 md:mb-0 md:w-1/6 md:pl-16 pl-1">
            <ProductFilters
              categoria={categoria}
              orden={orden}
              categorias={["Todas", ...categorias.map((c) => c.nombre)]}
              onCategoriaChange={setCategoria}
              onOrdenChange={setOrden}
            />
          </aside>

          <div className="flex-1">
            {loading ? (
              <div className="flex flex-col justify-center items-center min-h-[200px]">
                <div className="w-16 h-16 border-4 border-t-[#00ff80] border-gray-600 rounded-full animate-spin"></div>
                <p className="mt-4 text-white">Cargando productos...</p>
              </div>
            ) : error ? (
              <p className="text-red-500 text-center">{error}</p>
            ) : (
              <CardContainers productos={productosOrdenados} />
            )}
          </div>
        </div>

        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700" />
      </div>
    </div>
  );
};
