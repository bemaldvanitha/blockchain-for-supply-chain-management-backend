const mongoose = require('mongoose');

// Define the schema for a product
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    blockchain: {
        type: Array,
        default: []
    }
});

// Create a model for the blog post schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;