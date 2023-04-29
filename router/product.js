const express = require('express');
const { uuid } = require('uuidv4');
const mongoose = require('mongoose');

const { Blockchain } = require('../blockchain/Blockchain.js');
const { Block } = require('../blockchain/Block.js');
const { Product } = require('../models/Product.js');

const router = express.Router();

//get one product details
router.get('/{id}',(req,res) => {

});

//create new product
router.post('/',async (req,res) => {
    const { name, description, brand, quantity, price, productId } = req.body;
    const id = uuid();

    const product = {
        name,
        description,
        brand,
        quantity,
        price,
    };

    const ProductChain = new Blockchain();
    ProductChain.addBlock(new Block(Date.now().toString(), { ...product }));

    // console.log(ProductChain.chain);

    const newProduct = new Product({
        name: name,
        productId: id,
        blockchain: ProductChain.chain
    });

    await newProduct.save();
    return res.status(200).json({ newProduct })
});

//update current product
router.put('/{id}',(req,res) => {

});

//delete product
router.delete('/{id}',(req,res) => {

});

module.exports = router;