// src/types/checkout.ts

export interface DatosUsuario {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  cp: string;
  localidad: string;
  provincia: string;
}

export interface CheckoutPayload {
  cart: {
    id: number;
    nombre: string;
    precio: number;
    cantidad: number;
    imagen?: string;
  }[];
  envio: number;
  datos: DatosUsuario;
}
