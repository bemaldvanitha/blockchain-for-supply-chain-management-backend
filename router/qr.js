const express = require('express');
const { uuid } = require('uuidv4');
const QRCode = require('qrcode');
const mongoose = require('mongoose');

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

    }catch (err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

module.exports = router;