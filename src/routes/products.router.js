const express = require("express");
const router = express.Router();
const ProductManager = require("../controllers/product-manager.js");
const productManager = new ProductManager();
const productModel = require("../models/product.model.js");
const mongoose = require("mongoose");


router.get("/", async (req, res) => {
    try {
        const { limit = 1, page = 1, sort } = req.query;

        // Realizar la paginación directamente en la consulta a la base de datos
        const result = await productModel.paginate({ category: "Electrónica" }, { limit: limit, page: page });

        // Obtener los productos paginados del resultado
        const productos = result.docs.map(result => {
            const { _id, ...rest } = result.toObject();
            return rest;
        });

        res.render("partials/products", {
            layout: "layouts/main", // Ruta al archivo de diseño sin la extensión del archivo ni el prefijo "views/"
            products: productos,
            pagination: { // Objeto con los datos de paginación
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                currentPage: result.page,
                totalPages: result.totalPages
            }
        });
        
    } catch (error) {
        console.error("Error al obtener productos", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});


router.get("/:pid", async (req, res) => {
    const id = req.params.pid;

    try {
        const producto = await productManager.getProductById(id);
        if (!producto) {
            return res.json({
                error: "Producto no encontrado"
            });
        }

        res.json(producto);
    } catch (error) {
        console.error("error al obtener producto", error);
        res.status(500).json({
            error: "Error interno del servidor al buscar producto por ID"
        });
    }
})

router.put("/:pid", async (req, res) => {
    const id = req.params.pid;
    const productoActualizado = req.body;

    try {
        await productManager.updateProduct((id), productoActualizado);
        res.json({
            message: "Producto actualizado exitoamente"
        });
    } catch (error) {
        console.error("Error al actualizar producto", error);
        res.status(500).json({
            error: "error interno del servidor"
        });
    }
})

router.delete("/:pid", async (req, res) => {
    const id = req.params.pid;

    try {
        await productManager.deleteProduct(id);
        res.json({
            message: "Producto eliminado exitosamente"
        });
    } catch (error) {
        console.error("Error al eliminar producto", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});

router.post("/", async (req, res) => {
    const nuevoProducto = req.body;

    try {
        await productManager.addProduct(nuevoProducto);
        res.status(201).json({
            message: "Producto agregado con éxito"
        });
    } catch (error) {
        console.error("Error al agregar producto", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
})

module.exports = router;