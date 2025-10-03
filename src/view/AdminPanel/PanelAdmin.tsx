import { useEffect, useState } from "react";
import axios from "axios";
import type { ReactNode } from "react"; // Mantenemos ReactNode aunque no lo uses aquí, por si lo necesitas.

interface Categoria {
  id: number;
  nombre: string;
}

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  descripcion: string;
  imagen: string | null;
  imagen2: string | null;
  link: string | null;
  categoria: Categoria;
}

export default function PanelAdmin() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [editing, setEditing] = useState<Producto | null>(null);

  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    stock: "",
    descripcion: "",
    link: "",
    categoria: "",
    imagen: "",
    imagen2: "",
  });

  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);

  useEffect(() => {
    fetchProductos();
    fetchCategorias();
  }, []);

  // 💡 FUNCIÓN HELPER PARA OBTENER EL HEADER DE AUTORIZACIÓN
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token no encontrado. Redirigir a login si es necesario.");
      // Opcional: podrías forzar la redirección aquí si no confías en ProtectedRoute
      return {};
    }
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const fetchProductos = async () => {
    try {
      // 💡 CORREGIDO: Usando el header de Authorization
      const res = await axios.get<Producto[]>(
        `${import.meta.env.VITE_API_URL}/admin/productos`,
        getAuthHeaders() // Usa el header de autenticación
      );
      setProductos(res.data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  const fetchCategorias = async () => {
    try {
      // 💡 CORREGIDO: Usando el header de Authorization
      const res = await axios.get<Categoria[]>(
        `${import.meta.env.VITE_API_URL}/admin/categorias`,
        getAuthHeaders() // Usa el header de autenticación
      );
      setCategorias(res.data);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("imagen", file);

    // 💡 CORREGIDO: Usando el header de Authorization
    const res = await axios.post<{ url: string }>(
      `${import.meta.env.VITE_API_URL}/productos/upload`,
      formData,
      {
        ...getAuthHeaders(), // Usa el header de autenticación
        headers: {
          "Content-Type": "multipart/form-data",
          ...getAuthHeaders().headers, // Fusiona con el header de Auth
        },
      }
    );
    return res.data.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imagenUrl = form.imagen;
      let imagen2Url = form.imagen2;

      if (file1) imagenUrl = await uploadImage(file1);
      if (file2) imagen2Url = await uploadImage(file2);

      const data = {
        ...form,
        precio: Number(form.precio),
        stock: Number(form.stock),
        categoria: Number(form.categoria),
        imagen: imagenUrl,
        imagen2: imagen2Url,
      };

      if (editing) {
        // 💡 CORREGIDO: Usando el header de Authorization
        await axios.put(
          `${import.meta.env.VITE_API_URL}/admin/productos/${editing.id}`,
          data,
          getAuthHeaders()
        );
        alert("✅ Producto actualizado");
      } else {
        // 💡 CORREGIDO: Usando el header de Authorization
        await axios.post(
          `${import.meta.env.VITE_API_URL}/admin/productos`,
          data,
          getAuthHeaders()
        );
        alert("✅ Producto creado");
      }

      setForm({
        nombre: "",
        precio: "",
        stock: "",
        descripcion: "",
        link: "",
        categoria: "",
        imagen: "",
        imagen2: "",
      });
      setFile1(null);
      setFile2(null);
      setEditing(null);

      fetchProductos();
    } catch (err) {
      console.error(err);
      alert("❌ Error al guardar producto");
    }
  };

  const handleEdit = (p: Producto) => {
    setEditing(p);
    setForm({
      nombre: p.nombre,
      precio: p.precio.toString(),
      stock: p.stock.toString(),
      descripcion: p.descripcion,
      link: p.link || "",
      categoria: p.categoria.id.toString(),
      imagen: p.imagen || "",
      imagen2: p.imagen2 || "",
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Seguro que quieres eliminar este producto?")) return;
    try {
      // 💡 CORREGIDO: Usando el header de Authorization
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/admin/productos/${id}`,
        getAuthHeaders()
      );
      fetchProductos();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  return (
    <div className="p-6 mt-20 flex flex-col">
      <h1 className="text-3xl font-bold mb-6">🛠️ Panel de Administración</h1>

      {/* Formulario */}
      <div className="max-w-3xl mx-auto px-6">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 p-6 rounded-lg shadow-md space-y-4 mb-8 text-white "
        >
          <h2 className="text-xl font-semibold mb-4">
            {editing ? "✏️ Editar Producto" : "➕ Crear Producto"}
          </h2>

          <input
            type="text"
            placeholder="Nombre"
            className="w-full p-2 rounded bg-gray-800"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          />
          <input
            type="number"
            placeholder="Precio"
            className="w-full p-2 rounded bg-gray-800"
            value={form.precio}
            onChange={(e) => setForm({ ...form, precio: e.target.value })}
          />
          <input
            type="number"
            placeholder="Stock"
            className="w-full p-2 rounded bg-gray-800"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
          />
          <textarea
            placeholder="Descripción"
            className="w-full p-2 rounded bg-gray-800"
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
          />
          <input
            type="text"
            placeholder="Link"
            className="w-full p-2 rounded bg-gray-800"
            value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })}
          />
          <select
            className="w-full p-2 rounded bg-gray-800"
            value={form.categoria}
            onChange={(e) => setForm({ ...form, categoria: e.target.value })}
          >
            <option value="">-- Selecciona categoría --</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>

          <div className="flex gap-4">
            <div>
              <label className="block text-sm mb-1">Imagen 1</label>
              <input
                type="file"
                onChange={(e) => setFile1(e.target.files?.[0] || null)}
              />
              {form.imagen && (
                <img src={form.imagen} alt="img1" className="mt-2 w-32" />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
          >
            {editing ? "Actualizar" : "Crear"}
          </button>
        </form>
      </div>

      {/* Lista de productos */}
      <h2 className="text-2xl font-bold mb-4">📦 Lista de Productos</h2>
      <table className="w-full border-collapse bg-gray-800 rounded-lg overflow-hidden">
        <thead className="bg-gray-700">
          <tr>
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Nombre</th>
            <th className="p-2 text-left">Precio</th>
            <th className="p-2 text-left">Stock</th>
            <th className="p-2 text-left">Categoría</th>
            <th className="p-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id} className="border-b border-gray-700">
              <td className="p-2">{p.id}</td>
              <td className="p-2">{p.nombre}</td>
              <td className="p-2">${p.precio}</td>
              <td className="p-2">{p.stock}</td>
              <td className="p-2">{p.categoria?.nombre}</td>
              <td className="p-2 flex gap-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="bg-blue-600 px-2 py-1 rounded hover:bg-blue-700"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-red-600 px-2 py-1 rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
