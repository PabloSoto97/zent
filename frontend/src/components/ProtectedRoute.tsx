import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsValid(false);
        return;
      }

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsValid(res.ok);
      } catch (err) {
        setIsValid(false);
      }
    };

    checkAuth();
  }, []);

  if (isValid === null)
    return <p className="text-white">Verificando sesión...</p>;
  if (!isValid) return <Navigate to="/login" replace />;

  return <>{children}</>;
};
