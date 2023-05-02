const express = require('express');
const { uuid } = require('uuidv4');
const mongoose = require('mongoose');

const { Blockchain } = require('../blockchain/Blockchain.js');
const { Block } = require('../blockchain/Block.js');
const { Product } = require('../models/Product.js');
const { ProductOwner } = require('../models/ProductOwner.js');

const router = express.Router();

//get one product details
router.get('/:id',async (req,res) => {
    try{
        const product = await Product.findById(req.params.id);

        if(!product){
            return res.status(404).json({ msg: 'No Product Found' })
        }

        const ProductChain = new Blockchain();
        ProductChain.clearAndAddBlock(product.blockchain);

        // console.log(product);
        // console.log(ProductChain.isValid());

        if(ProductChain.isValid()){
            return res.status(200).json({ product })
        }else{
            return res.status(200).json({ msg: 'blockchain got tampered' });
        }

    }catch (err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//get all products for product owner
router.get('/product-owner/:id',async (req,res) => {
    try{
        const owner = await ProductOwner.findById(req.params.id);
        const allProducts = await Product.find();
        const prodIdList = owner.productList;

        let prodList = allProducts.map((prod) => {
            const ProductChain = new Blockchain();
            ProductChain.clearAndAddBlock(prod.blockchain);

            if(prodIdList.includes(prod.productId) && ProductChain.isValid()){
                return prod;
            }
        });
        //console.log(prodList)

        return res.status(200).json({ prodList });
    }catch (err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//create new product
router.post('/',async (req,res) => {
    try{
        const { name, description, brand, quantity, price, ownerId } = req.body;
        const id = uuid();

        const owner = await ProductOwner.findById(ownerId);

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

        let newProduct = new Product({
            name: name,
            productId: id,
            blockchain: ProductChain.chain
        });

        newProduct = await newProduct.save();

        owner.productList = [...owner.productList, id];
        await owner.save();

        return res.status(201).json({ newProduct });
    }catch (err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//update current product
router.put('/:id', async (req,res) => {
    try{
        const product = await Product.findById(req.params.id);
        const newData = req.body;

        if(!product){
            return res.status(404).json({ msg: 'No Product Found' })
        }

        const ProductChain = new Blockchain();
        ProductChain.clearAndAddBlock(product.blockchain);
        ProductChain.addBlock(new Block(Date.now().toString(), { ...newData }));

        // console.log(ProductChain.chain);

        product.blockchain = [ ...product.blockchain, ProductChain.chain[ProductChain.chain.length - 1] ];
        await product.save();

        return res.status(200).json({ product });

    }catch (err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//delete product
router.delete('/:id/:owner_id',async (req,res) => {
    try{
        const product = await Product.findById(req.params.id);
        const owner = await ProductOwner.findById(req.params.owner_id);

        const productId = product.productId;
        const indexToDelete = owner.productList.findIndex(prodId => prodId === productId );

        if (indexToDelete !== -1) {
            owner.productList.splice(indexToDelete, 1);
        }

        await owner.save();

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