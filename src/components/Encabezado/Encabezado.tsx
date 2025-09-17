import styles from "./Encabezado.module.css";

export const Encabezado = () => {
  return (
    <div className={styles.encabezado}>
      <div className={styles.videoContainer}>
        <video autoPlay loop muted playsInline className={styles.video}>
          <source src="/video2.mp4" type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      </div>

      {/* Texto estilo referencia abajo a la izquierda */}
      <div className={styles.overlay}>
        <div className={styles.textContainer}>
          <h2 className={styles.subtitulo}>BIENVENIDO A</h2>
          <img src="/logo3.png" alt="ZENT" className={styles.logo} />
          <h4 className={styles.descripcion}>Repuestos y accesorios</h4>
        </div>
      </div>
    </div>
  );
};
