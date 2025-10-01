// src/helpers/validarDatos.ts
interface UserData {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  cp: string;
  localidad: string;
  provincia: string;
}

export const validarDatos = (data: UserData): string[] => {
  const errores: string[] = [];

  if (!data.nombre.trim()) errores.push("El nombre es obligatorio");
  if (!data.email.trim()) errores.push("El email es obligatorio");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errores.push("El email no es válido");
  if (!data.telefono.trim()) errores.push("El teléfono es obligatorio");
  if (!data.direccion.trim()) errores.push("La dirección es obligatoria");
  if (!data.localidad.trim()) errores.push("La localidad es obligatoria");
  if (!data.provincia.trim()) errores.push("La provincia es obligatoria");
  if (!data.cp.trim()) errores.push("El código postal es obligatorio");

  return errores;
};
