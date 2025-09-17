import { useState } from "react";
import styles from "./Productos.module.css";
import { productos } from "../../data/productos";
import { Link } from "react-router-dom";

export const Productos = () => {
  const [orden, setOrden] = useState("asc");

  // Ordenamos productos según el estado
  const productosOrdenados = [...productos].sort((a, b) =>
    orden === "asc" ? a.precio - b.precio : b.precio - a.precio
  );

  return (
    <div className={styles.productosContainer}>
      <div className={styles.inner}>
        <h2 className={styles.titulo}>Productos</h2>

        <div className={styles.layout}>
          {/* Sidebar lateral — ahora solo filtro de precio */}
          <aside className={styles.sidebar}>
            <h4>Ordenar por precio</h4>
            <select
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
              className={styles.select}
            >
              <option value="asc">Menor a mayor</option>
              <option value="desc">Mayor a menor</option>
            </select>
          </aside>

          {/* Area de productos */}
          <main className={styles.productArea}>
            <div className={styles.grid}>
              {productosOrdenados.map((producto) => (
                <article key={producto.id} className={styles.card2}>
                  <div className={styles.firstcontent}>
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className={styles.imagen}
                    />
                  </div>

                  <div className={styles.secondcontent}>
                    <img
                      src={producto.imagen2 ?? producto.imagen}
                      alt={producto.nombre}
                      className={styles.imagen}
                    />
                  </div>

                  <div className={styles.info}>
                    <h3 className={styles.nombre}>{producto.nombre}</h3>
                    <p className={styles.precio}>
                      ${producto.precio.toLocaleString()}
                    </p>
                  </div>
                  <Link
                    to={`/productos/${producto.id}`}
                    className={styles.boton}
                  >
                    Ver
                  </Link>
                </article>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
