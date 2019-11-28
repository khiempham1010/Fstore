const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    name: String,
    phone: String,
    message: String,
    cart: Object,
    status: Number,
    price:Number
});

const Order = mongoose.model('order', orderSchema);
module.exports = Order;