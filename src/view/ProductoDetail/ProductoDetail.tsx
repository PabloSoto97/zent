import { useParams, Link } from "react-router-dom";
import { productos } from "../../data/productos";
import styles from "./ProductoDetail.module.css";
import { useState } from "react";

export const ProductoDetail = () => {
  const { id } = useParams<{ id: string }>();
  const producto = productos.find((p) => p.id.toString() === id);

  const [selectedImage, setSelectedImage] = useState(producto?.imagen);

  if (!producto) {
    return (
      <div className={styles.container}>
        <h2>Producto no encontrado</h2>
        <Link to="/productos" className={styles.volver}>
          Volver a productos
        </Link>
      </div>
    );
  }

  // Creamos la galería: imagen principal + sub-imágenes
  const galeria = [producto.imagen, producto.imagen2].filter(Boolean);

  return (
    <div className={styles.container}>
      <div className={styles.detailCard}>
        <div className={styles.imgWrapper}>
          <img
            src={selectedImage}
            alt={producto.nombre}
            className={styles.imagen}
          />

          {/* Miniaturas */}
          <div className={styles.thumbnails}>
            {galeria.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumb-${index}`}
                className={`${styles.thumb} ${
                  selectedImage === img ? styles.active : ""
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        <div className={styles.info}>
          <h2 className={styles.nombre}>{producto.nombre}</h2>
          <p className={styles.precio}>${producto.precio.toLocaleString()}</p>
          <p className={styles.stock}>
            ¡Solo quedan {producto.stock.toLocaleString()} en stock!
          </p>
          <a
            href={producto.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnComprar}
          >
            Comprar
          </a>
          <p className={styles.descripcion}>
            {producto.descripcion ||
              "Este producto es de alta calidad y cuenta con garantía oficial."}
          </p>
          <div className={styles.mediosPago}>
            <h3>Medios de pago</h3>
            <p>Cuotas sin tarjeta con Mercado Pago</p>
            <div className={styles.tarjetas}>
              <img src="/visa.svg" alt="Visa" />
              <img src="/mastercard.svg" alt="Mastercard" />
              <img src="/naranja.svg" alt="Naranja" />
              <img src="/cabal.svg" alt="Cabal" />
              <img src="/rapipago.svg" alt="Rapipago" />
            </div>
          </div>
          <Link to="/productos" className={styles.volver}>
            Volver
          </Link>
        </div>
      </div>
    </div>
  );
};
