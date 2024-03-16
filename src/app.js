// app.js
import express from "express";
import { urlencoded, json } from "express"; // Importar métodos individualmente
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import "./database.js";

const app = express();
const PUERTO = 8080;

app.use(urlencoded({ extended: true }));
app.use(json());

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});
