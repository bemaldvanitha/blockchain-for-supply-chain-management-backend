const express = require('express');
const { uuid } = require('uuidv4');
const QRCode = require('qrcode');
const mongoose = require('mongoose');
const ejs = require('ejs');
const fs = require('fs');

const { ProductOwner } = require('../models/ProductOwner.js');
const { Product } = require('../models/Product.js');
const {Blockchain} = require("../blockchain/Blockchain");

const router = express.Router();

router.post('/', async (req, res) => {
    try{
        const { productId, productOwnerId } = req.body;
        const id = uuid();
        await QRCode.toFile(`./qr/${id}.png`,`http://localhost:3000/qr/${productOwnerId}/${productId}`);
        return res.status(200).json({ 'msg': `qr generated`, 'location': `/qr/${id}` });

    }catch (err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/:ownId/:prodId', async (req, res) => {
    try{
        const owner = await ProductOwner.findById(req.params.ownId);
        const product = await Product.find({ productId: req.params.prodId });

        const data = {
            owner: {
                brandName: owner.brandName,
                location: owner.location,
                contactNumber: owner.contactNumber,
                contactEmail: owner.contactEmail
            },
            product: {
                name: product[0].name,
                blockchain: product[0].blockchain,
                data: []
            }
        }

        let allData = [];

        product[0].blockchain.map((block) => {
            allData.push(block.data);
        });

        allData.shift();
        data.product.data = allData;
        //console.log(data);

        const ProductChain = new Blockchain();
        ProductChain.clearAndAddBlock(product[0].blockchain);

        if(ProductChain.isValid()){

            const template = fs.readFileSync('./template/index.ejs','utf8');
            const html = ejs.render(template,data);

            // Set the content type header to text/html
            res.setHeader('Content-Type', 'text/html');

            // Send the HTML content in the response body
            res.statusCode = 200;
            res.end(html);
        }else{

            const template = fs.readFileSync('./template/error.ejs','utf8');
            const html = ejs.render(template,{});

            // Set the content type header to text/html
            res.setHeader('Content-Type', 'text/html');

            // Send the HTML content in the response body
            res.statusCode = 200;
            res.end(html);
        }

    }catch (err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

module.exports = router;