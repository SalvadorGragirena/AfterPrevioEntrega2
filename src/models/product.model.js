const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: number,
        required: true
    },
    img: {
        type: String
    },
    code: {
        type: string,
        required: true,
        unique: true
    },
    category: {
        type: string,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    thumbnails: {
        type: [string]
    }
})

const ProductModel = mongoose.model("products", productSchema);

module.exports = ProductModel;