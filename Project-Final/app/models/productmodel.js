const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true },
    image: String,
    categoryId: String,
    description: String,
    price: Number,
    quantity: Number,
    status: Number,
});

const Product = mongoose.model('product', productSchema);
module.exports = Product;