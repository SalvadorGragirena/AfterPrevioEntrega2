const mongoose = requiere("mongoose");

mongoose.connect("mongodb+srv://salvador:Chouse@cluster0.owqsy0n.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("conexión exitosa"))
    .catch((error) => console.log("Error en la conexión", error))