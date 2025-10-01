"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/categorias.ts
const express_1 = require("express");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
// =========================
// GET /categorias → lista
// =========================
router.get("/", async (req, res) => {
    try {
        const categorias = await prisma.categoria.findMany({
            include: { productos: true },
        });
        res.json(categorias);
    }
    catch (err) {
        console.error("❌ Error obteniendo categorías:", err);
        res.status(500).json({ error: "Error al obtener categorías" });
    }
});
// =========================
// POST /categorias → crear
// =========================
router.post("/", async (req, res) => {
    try {
        const { nombre } = req.body;
        if (!nombre) {
            return res.status(400).json({ error: "El nombre es obligatorio" });
        }
        const nuevaCategoria = await prisma.categoria.create({
            data: { nombre },
        });
        res.status(201).json(nuevaCategoria);
    }
    catch (err) {
        console.error("❌ Error creando categoría:", err);
        res.status(500).json({ error: "Error al crear categoría" });
    }
});
// =========================
// PUT /categorias/:id → actualizar
// =========================
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        const categoriaExistente = await prisma.categoria.findUnique({
            where: { id: Number(id) },
        });
        if (!categoriaExistente) {
            return res.status(404).json({ error: "Categoría no encontrada" });
        }
        const categoriaActualizada = await prisma.categoria.update({
            where: { id: Number(id) },
            data: { nombre: nombre ?? categoriaExistente.nombre },
        });
        res.json(categoriaActualizada);
    }
    catch (err) {
        console.error("❌ Error actualizando categoría:", err);
        res.status(500).json({ error: "Error al actualizar categoría" });
    }
});
// =========================
// DELETE /categorias/:id → eliminar
// =========================
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const categoriaExistente = await prisma.categoria.findUnique({
            where: { id: Number(id) },
        });
        if (!categoriaExistente) {
            return res.status(404).json({ error: "Categoría no encontrada" });
        }
        await prisma.categoria.delete({
            where: { id: Number(id) },
        });
        res.json({ message: "Categoría eliminada correctamente" });
    }
    catch (err) {
        console.error("❌ Error eliminando categoría:", err);
        res.status(500).json({ error: "Error al eliminar categoría" });
    }
});
exports.default = router;
