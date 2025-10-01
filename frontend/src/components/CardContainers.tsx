import { Card } from "./Card";

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

interface ProductosContainer {
  productos: Producto[];
}

export const CardContainers = ({ productos }: ProductosContainer) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:pl-14 pl-0.5">
      {productos.map((p) => (
        <Card
          key={p.id}
          id={p.id}
          nombre={p.nombre}
          precio={p.precio}
          imagen={p.imagen}
          categoria={p.categoria.nombre}
        />
      ))}
    </div>
  );
};
