const express = require("express");
const router = express.Router();
const CartManager = require("../controllers/cart-manager.js");
const CartManager = new CartManager();

router.post("/", async (req, res) => {
    try {
        const nuevoCarrito = await CartManager.crearCarrito();
        res.json(nuevoCarrito);
    } catch (error) {
        console.error("Error al crear un nuevo carito", error);
        res.status(500).json({ error: "Error interno del servidor"});
    }
});

router.get("/:cid", async (req, res) => {
    const cartId = req.params.cid;

    try {
        const carrito = await CartManager.getCarritoById(cartId);
        res.json(carrito.products);
    } catch (error) {
        console.error("error al obtener el carrito", error);
        res.status(500).json({ error: "Error interno del servidor"});
    }
});

router.post("/:cid/product/:pid", async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;

    try {
        const actualizarCarrito = await CartManager.agregarProductoAlCarrito(cartId);
        res.json(carrito.products);
    } catch (error) {
        console.error("Error al obtener el carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

module.exports = router;