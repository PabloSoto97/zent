import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  Home,
  Productos,
  SobreNosotros,
  Contacto,
  ProductoDetail,
  Success,
  Failure,
  Pending,
} from "./view";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { CartProvider } from "./context/cartContext";
import { Cart } from "./view/Cart/Cart";
import PanelAdmin from "./view/AdminPanel/PanelAdmin";
import Login from "./view/Login/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inicio" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/sobre-nosotros" element={<SobreNosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/productos/:id" element={<ProductoDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<Success />} />
          <Route path="/failure" element={<Failure />} />
          <Route path="/pending" element={<Pending />} />

          {/* 🔒 Rutas protegidas */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <PanelAdmin />
              </ProtectedRoute>
            }
          />

          {/* 👤 Login */}
          <Route path="/login" element={<Login />} />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </CartProvider>
    </BrowserRouter>
  );
};
