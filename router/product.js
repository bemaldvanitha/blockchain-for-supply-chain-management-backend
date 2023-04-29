const express = require('express');
const { uuid } = require('uuidv4');

const { Blockchain } = require('../blockchain/Blockchain.js');
const { Block } = require('../blockchain/Block.js');

const router = express.Router();

//get one product details
router.get('/{id}',(req,res) => {

});

//create new product
router.post('/',(req,res) => {
    const { name, description, brand, quantity, price } = req.body;
    const id = uuid();

    const product = {
        id,
        name,
        description,
        brand,
        quantity,
        price
    };

    const ProductChain = new Blockchain();
    ProductChain.addBlock(new Block(Date.now().toString(), { ...product }));

    console.log(ProductChain.chain);
});

//update current product
router.put('/{id}',(req,res) => {

});

//delete product
router.delete('/{id}',(req,res) => {

});

module.exports = router;