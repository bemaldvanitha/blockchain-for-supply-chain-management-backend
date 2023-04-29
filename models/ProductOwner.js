const mongoose = require('mongoose');

// Define the schema for a product
const productOwnerSchema = new mongoose.Schema({
    brandName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    contactEmail: {
        type: String,
        required: true
    },
    productList: {
        type: Array,
        default: []
    }
});

// Create a model for the blog post schema
const ProductOwner = mongoose.model('ProductOwner', productOwnerSchema);

module.exports = { ProductOwner };