import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className={styles.typesimple}>
      <div className={styles.brand}>
        <img className={styles.icon} alt="Logo" src="/logo2.png" />
      </div>

      {/* Links desktop */}
      <nav className={styles.navLinks}>
        <div className={styles.navLink}>
          <Link to="/inicio" className={styles.navLabel}>
            Inicio
          </Link>
          <Link to="/productos" className={styles.navLabel}>
            Productos
          </Link>
          <Link to="/sobre-nosotros" className={styles.navLabel}>
            Sobre Nosotros
          </Link>
          <Link to="/contacto" className={styles.navLabel}>
            Contacto
          </Link>
        </div>
      </nav>

      {/* Botón hamburguesa (solo mobile) */}
      <button className={styles.hamburger} onClick={toggleMenu}>
        <span />
        <span />
        <span />
      </button>

      {/* Menú mobile */}
      <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}>
        <Link to="/inicio" onClick={closeMenu}>
          Inicio
        </Link>
        <Link to="/productos" onClick={closeMenu}>
          Productos
        </Link>
        <Link to="/sobre-nosotros" onClick={closeMenu}>
          Sobre Nosotros
        </Link>
        <Link to="/contacto" onClick={closeMenu}>
          Contacto
        </Link>
      </div>

      {/* Overlay oscuro */}
      {isOpen && <div className={styles.overlay} onClick={closeMenu}></div>}
    </header>
  );
};
