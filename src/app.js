const express = require("express");
const app = express();
const PUERTO = 8080;
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");
const exphbs = require("express-handlebars");
const http = require("http"); // Importa el módulo http
const socket = require("socket.io");
require("./database.js");

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

const server = http.createServer(app); // Crea un servidor HTTP utilizando Express

///const io = new socket.Server(server); // Crea una instancia de Socket.IO adjuntando el servidor HTTP

const httpServer = app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});

const io = new socket.Server(httpServer);

const MessageModel = require("./models/message.model.js");


let messages = [];


io.on("connection", (socket) => {
    console.log("Un cliente conectado");

    socket.on("message", async  (data) => {
       
        await MessageModel.create(data);

      const messages = await MessageModel.find();

       io.emit("messagesLogs", messages);

    })
} )