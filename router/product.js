const express = require('express');
const { uuid } = require('uuidv4');
const mongoose = require('mongoose');

const { Blockchain } = require('../blockchain/Blockchain.js');
const { Block } = require('../blockchain/Block.js');
const { Product } = require('../models/Product.js');

const router = express.Router();

//get one product details
router.get('/:id',async (req,res) => {
    const product = await Product.findById(req.params.id);

    if(!product){
        return res.status(404).json({ msg: 'No Product Found' })
    }

    //console.log(product);
    return res.status(200).json({ product })
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
router.delete('/:id',async (req,res) => {
    try{
        const product = await Product.findById(req.params.id);

        if(!product){
            return res.status(404).json({ msg: 'No Product Found' })
        }

        await Product.findByIdAndRemove(req.params.id);
        return res.json({ msg: 'Product removed' });

    }catch (err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;