const express = require("express");
const app = express();
const PUERTO = 8080;
const productsRouter = require("./routes/carts.router.js");
require("./database.js");

app.use(express.urlencoded({ extended: true })); // Corrige el uso de urlencoded
app.use(express.json()); // Corrige el uso de json

//app.use("/api/products", productsRouter);
//app.use("/api/carts", cartsRouter);



app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});
