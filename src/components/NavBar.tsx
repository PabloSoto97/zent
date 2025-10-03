import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { CartSidebar } from "./CartSidebar"; // tu sidebar

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false); // menu mobile
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false); // carrito sidebar

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // efecto scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 
      flex items-center justify-between w-full h-[140px] 
      bg-black border-b border-gray-600/60 px-8 transition-transform duration-500
      ${show ? "translate-y-0" : "-translate-y-full"}`}
    >
      {/* Brand */}
      <div className="flex items-center gap-2">
        <img
          className="w-full max-w-[250px] object-contain -rotate-12"
          alt="Logo"
          src="/logo3.png"
        />
      </div>

      {/* Links desktop */}
      <nav className="leading-relaxed hidden md:flex items-center justify-end gap-10 font-[HeadlinesRegular] text-2xl font-medium text-white">
        <Link to="/inicio" className="hover:text-[#8f0000] transition-colors">
          Inicio
        </Link>
        <Link
          to="/productos"
          className="hover:text-[#8f0000] transition-colors"
        >
          Productos
        </Link>
        <Link
          to="/sobre-nosotros"
          className="hover:text-[#8f0000] transition-colors"
        >
          Sobre Nosotros
        </Link>
        <Link to="/contacto" className="hover:text-[#8f0000] transition-colors">
          Contacto
        </Link>

        {/* Carrito */}
      </nav>

      {/* Hamburguesa */}
      <button
        className="md:hidden flex flex-col gap-1.5 z-[1100]"
        onClick={toggleMenu}
      >
        <span className="w-7 h-[3px] bg-white rounded"></span>
        <span className="w-7 h-[3px] bg-white rounded"></span>
        <span className="w-7 h-[3px] bg-white rounded"></span>
      </button>

      {/* Menú mobile */}
      <div
        className={`fixed top-0 right-0 h-screen w-[70%] max-w-[260px] bg-black flex flex-col p-8 pt-24 gap-6 transform transition-transform duration-300 z-[1050] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Link
          to="/inicio"
          onClick={closeMenu}
          className="text-white text-lg font-bold hover:text-[#8f0000]"
        >
          Inicio
        </Link>
        <Link
          to="/productos"
          onClick={closeMenu}
          className="text-white text-lg font-bold hover:text-[#8f0000]"
        >
          Productos
        </Link>
        <Link
          to="/sobre-nosotros"
          onClick={closeMenu}
          className="text-white text-lg font-bold hover:text-[#8f0000]"
        >
          Sobre Nosotros
        </Link>
        <Link
          to="/contacto"
          onClick={closeMenu}
          className="text-white text-lg font-bold hover:text-[#8f0000]"
        >
          Contacto
        </Link>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-black/60 z-[1040]"
          onClick={closeMenu}
        ></div>
      )}

      {/* Sidebar carrito */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};
