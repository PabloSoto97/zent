import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  Home,
  Productos,
  SobreNosotros,
  Contacto,
  ProductoDetail,
} from "./view";
import { NavBar } from "./components/Navbar/NavBar";
import { Footer } from "./components/Footer/Footer";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inicio" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/productos/:id" element={<ProductoDetail />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
};
