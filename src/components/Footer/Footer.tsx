import style from "./Footer.module.css";
import { Link } from "react-router-dom";
export const Footer = () => {
  return (
    <div className={style.container}>
      <div className={style.brand}>
        <img className={style.icon} src="/logo2.png" alt="logo" />
      </div>
      <nav className={style.navLinks}>
        <div className={style.navLink}>
          <Link to="/inicio" className={style.navLabel}>
            Inicio
          </Link>
          <Link to="/productos" className={style.navLabel}>
            Productos
          </Link>
          <Link to="/sobre-nosotros" className={style.navLabel}>
            Conocenos Más
          </Link>
          <Link to="/contacto" className={style.navLabel}>
            Contacto
          </Link>
        </div>
      </nav>
      <div className={style.info}>
        <h2>Encontranos en</h2>
        <p>📍 Av. El Maestro, W3400 Corrientes ,Argentina </p>
      </div>
      <div className={style.social}>
        <p className={style.socialTitle}>SÍGUENOS</p>
        <a
          href="https://www.instagram.com/zent.repuestos?igsh=aTBibGhnaGh6MTcz"
          target="_blank"
          rel="noopener noreferrer"
          className={style.instagramButton}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
            className={style.instagramIcon}
          >
            <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.25-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" />
          </svg>
        </a>
      </div>
    </div>
  );
};
