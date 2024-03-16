const express = require("express");
const router = express.Router();

const ProductManager = require("../controllers/product-manager.js");
const ProductManager = new ProductManager();

router.get("/", async (req, res) => {
    try {
        const limit = req.query.limit;
        const productos = await ProductManager.getProducts();
        if (limit) { 
            res.json(productos.slice(0, limit));
        } else {
            res.json(productos);
        }
    }   catch (error) {
        console.error("Error al obtener productos", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
})

router.get("/:pid", async (req, res) => {
    const id = req.params.pid;

    try {
        const producto = await ProductManager.getProductById(id);
        if (!producto) {
            return res.json({
                error: "Producto no encontrado"
            });
        }

        res.json(producto);
    } catch (error) {
        console.error("error al obtener producto", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
})

router.put("/:pid", async (req,res) => {
    const id = req.params.pid;
    const productoActualizado = req.body;

    try{
        await ProductManager.updateProduct((id), productoActualizado);
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
        await ProductManager.deleteProduct(id);
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

module.exports = router;