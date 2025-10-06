# 🛠️ Zent

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

**Zent** es una aplicación web moderna para una **tienda de repuestos y accesorios**, donde los usuarios pueden explorar un catálogo completo de productos, ver detalles y contactar directamente por **WhatsApp** para coordinar el pago y la entrega.

🌐 **Demo en producción:** [zentcommerce.vercel.app](https://zentcommerce.vercel.app/)

---

## 🧩 Descripción general

Zent fue desarrollado como un proyecto full stack enfocado en ofrecer una experiencia fluida, moderna y rápida para la gestión y visualización de productos de una tienda.  
Su diseño prioriza la **usabilidad**, la **velocidad de carga** y la **simplicidad visual**, manteniendo una arquitectura clara y escalable.

El sistema integra un **frontend dinámico** con React y TypeScript, y un **backend en Express** desplegado en Render, conectado a una base de datos Neon (PostgreSQL).

---

## ⚙️ Tecnologías utilizadas

### 🧠 Frontend

- **React + TypeScript**
- **Vite** para desarrollo rápido y liviano
- **Tailwind CSS** para estilos y diseño responsive
- **Vercel** para el deploy del frontend

### 🗄️ Backend

- **Node.js + Express.js** para el servidor y endpoints
- **Neon (PostgreSQL)** como base de datos
- **Render** para el deploy del backend

---

## 💡 Funcionalidades principales

- 🛍️ **Catálogo dinámico de productos** con imágenes, precios y categorías.
- 🔎 **Búsqueda y filtrado** por nombre o tipo de producto.
- 💬 **Contacto directo por WhatsApp** desde cada producto.
- 🧾 **Gestión desde panel admin** (creación, edición y eliminación de productos).
- ⚡ **Carga rápida y diseño responsive** optimizado para dispositivos móviles.

---

## 🚀 Instalación y ejecución local

Cloná el repositorio y ejecutá los siguientes pasos:

```bash
git clone https://github.com/PabloSoto97/zent.git
cd zent
npm install
🔧 Iniciar en modo desarrollo
bash
Copiar código
npm run dev
🏗️ Compilar para producción
bash
Copiar código
npm run build
🧭 Estructura del proyecto
csharp
Copiar código
/
├── backend/              # Servidor Express y lógica del API
├── src/                  # Código del frontend (React + TS)
│   ├── components/       # Componentes reutilizables
│   ├── views/            # Vistas principales (Home, Productos, etc.)
│   ├── assets/           # Imágenes y recursos estáticos
│   └── ...
├── public/               # Archivos públicos
├── package.json
├── vite.config.ts
└── ...
🎨 Enfoque de diseño
El diseño de Zent sigue una estética minimalista y moderna, inspirada en plataformas de comercio electrónico actuales.
El objetivo fue crear una experiencia visual clara y confiable, sin sobrecargar al usuario.

Paleta de colores neutra y profesional.

Botones y tarjetas con estilo “commerce” moderno.

Adaptado para pantallas móviles y tablets.

👨‍💻 Sobre el proyecto
Zent fue desarrollado como un proyecto personal para demostrar habilidades en:

Desarrollo Full Stack moderno (React, TypeScript, Express).

Diseño UX/UI funcional con Tailwind.

Integración y despliegue en servicios en la nube (Render + Vercel + Neon).

El objetivo fue construir una aplicación realista de e-commerce, enfocada en la presentación de productos y contacto directo con el cliente.


🪄 Autor
Desarrollado por Pablo Soto
```
