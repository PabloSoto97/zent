import styles from "./Sobrenosotos.module.css";

export const SobreNosotros = () => {
  return (
    <section className={styles.about}>
      <h2 className={styles.title}>Sobre Nosotros</h2>
      <p className={styles.intro}>
        En <span>ZENT</span>, somos una empresa de Corrientes, Argentina,
        dedicada a ofrecer <span>accesorios</span> y{" "}
        <span>repuestos de motos</span> de calidad. Nos mueve la pasión por las
        dos ruedas y el compromiso con nuestros clientes.
      </p>

      <div className={styles.cards}>
        {/* Visión */}
        <div className={styles.outer}>
          <div className={styles.card}>
            <div className={styles.dot}></div>
            <div className={styles.ray}></div>
            <div className={styles.cardTitle}>Visión</div>
            <p>
              Ser referentes en el mercado de repuestos y accesorios para motos
              en Argentina, destacándonos por la innovación y la confianza.
            </p>
            <div className={`${styles.line} ${styles.topl}`}></div>
            <div className={`${styles.line} ${styles.leftl}`}></div>
            <div className={`${styles.line} ${styles.bottoml}`}></div>
            <div className={`${styles.line} ${styles.rightl}`}></div>
          </div>
        </div>

        {/* Misión */}
        <div className={styles.outer}>
          <div className={styles.card}>
            <div className={styles.dot}></div>
            <div className={styles.ray}></div>
            <div className={styles.cardTitle}>Misión</div>
            <p>
              Brindar soluciones accesibles, confiables y de calidad que
              acompañen a nuestros clientes en cada viaje.
            </p>
            <div className={`${styles.line} ${styles.topl}`}></div>
            <div className={`${styles.line} ${styles.leftl}`}></div>
            <div className={`${styles.line} ${styles.bottoml}`}></div>
            <div className={`${styles.line} ${styles.rightl}`}></div>
          </div>
        </div>

        {/* Valores */}
        <div className={styles.outer}>
          <div className={styles.card}>
            <div className={styles.dot}></div>
            <div className={styles.ray}></div>
            <div className={styles.cardTitle}>Valores</div>
            <p>
              Pasión, compromiso, confianza e innovación. Son los pilares que
              nos guían día a día.
            </p>
            <div className={`${styles.line} ${styles.topl}`}></div>
            <div className={`${styles.line} ${styles.leftl}`}></div>
            <div className={`${styles.line} ${styles.bottoml}`}></div>
            <div className={`${styles.line} ${styles.rightl}`}></div>
          </div>
        </div>
      </div>
    </section>
  );
};
