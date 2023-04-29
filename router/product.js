const express = require('express');

const { Blockchain } = require('../blockchain/Blockchain.js');
const { Block } = require('../blockchain/Block.js');

const router = express.Router();

//get one product details
router.get('/{id}',(req,res) => {

});

//create new product
router.post('/',(req,res) => {
    const ProductChain = new Blockchain();
    ProductChain.addBlock(new Block(Date.now().toString(), {  }));
});

//update current product
router.put('/{id}',(req,res) => {

});

//delete product
router.delete('/{id}',(req,res) => {

});

module.exports = router;