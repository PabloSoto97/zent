"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
// =========================
// Configuración de multer
// =========================
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
// =========================
// GET /productos → lista
// =========================
router.get("/", async (req, res) => {
    try {
        const productos = await prisma.producto.findMany({
            include: { categoria: true },
        });
        res.json(productos);
    }
    catch (err) {
        console.error("❌ Error obteniendo productos:", err);
        res.status(500).json({ error: "Error al obtener productos" });
    }
});
// =========================
// GET /productos/:id → uno por id
// =========================
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await prisma.producto.findUnique({
            where: { id: Number(id) },
            include: { categoria: true },
        });
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.json(producto);
    }
    catch (err) {
        console.error("❌ Error obteniendo producto:", err);
        res.status(500).json({ error: "Error al obtener producto" });
    }
});
// =========================
// POST /productos/upload → subir imagen a Cloudinary
// =========================
router.post("/upload", upload.single("imagen"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No se envió ninguna imagen" });
        }
        // Subida a Cloudinary
        const uploadStream = cloudinary_1.default.uploader.upload_stream({ folder: "productos" }, (error, result) => {
            if (error || !result) {
                console.error("❌ Error Cloudinary:", error);
                return res.status(500).json({ error: "Error al subir imagen" });
            }
            res.json({ url: result.secure_url });
        });
        // Enviar buffer del archivo
        uploadStream.end(req.file.buffer);
    }
    catch (err) {
        console.error("❌ Error subiendo imagen:", err);
        res.status(500).json({ error: "Error al subir imagen" });
    }
});
// =========================
// POST /productos → crear
// =========================
router.post("/", async (req, res) => {
    try {
        const { nombre, precio, stock, descripcion, imagen, imagen2, link, categoria, } = req.body;
        if (!nombre || !precio || !stock || !descripcion || !categoria) {
            return res.status(400).json({ error: "Faltan campos obligatorios" });
        }
        const nuevoProducto = await prisma.producto.create({
            data: {
                nombre,
                precio: Number(precio),
                stock: Number(stock),
                descripcion,
                imagen: imagen || null, // URL de Cloudinary
                imagen2: imagen2 || null, // URL de Cloudinary
                link: link || null,
                categoria: {
                    connect: { id: Number(categoria) },
                },
            },
            include: { categoria: true },
        });
        res.status(201).json(nuevoProducto);
    }
    catch (err) {
        console.error("❌ Error creando producto:", err);
        res.status(500).json({ error: "Error al crear producto" });
    }
});
// =========================
// PUT /productos/:id → actualizar
// =========================
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, precio, stock, descripcion, imagen, imagen2, link, categoria, } = req.body;
        const productoExistente = await prisma.producto.findUnique({
            where: { id: Number(id) },
        });
        if (!productoExistente) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        const productoActualizado = await prisma.producto.update({
            where: { id: Number(id) },
            data: {
                nombre: nombre ?? productoExistente.nombre,
                precio: precio !== undefined ? Number(precio) : productoExistente.precio,
                stock: stock !== undefined ? Number(stock) : productoExistente.stock,
                descripcion: descripcion ?? productoExistente.descripcion,
                imagen: imagen ?? productoExistente.imagen, // siempre URL de Cloudinary
                imagen2: imagen2 ?? productoExistente.imagen2,
                link: link ?? productoExistente.link,
                categoria: categoria
                    ? { connect: { id: Number(categoria) } }
                    : undefined,
            },
            include: { categoria: true },
        });
        res.json(productoActualizado);
    }
    catch (err) {
        console.error("❌ Error actualizando producto:", err);
        res.status(500).json({ error: "Error al actualizar producto" });
    }
});
// =========================
// DELETE /productos/:id → eliminar
// =========================
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const productoExistente = await prisma.producto.findUnique({
            where: { id: Number(id) },
        });
        if (!productoExistente) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        await prisma.producto.delete({
            where: { id: Number(id) },
        });
        res.json({ message: "Producto eliminado correctamente" });
    }
    catch (err) {
        console.error("❌ Error eliminando producto:", err);
        res.status(500).json({ error: "Error al eliminar producto" });
    }
});
exports.default = router;
