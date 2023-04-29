const express = require('express');
const { uuid } = require('uuidv4');
const mongoose = require('mongoose');

const { ProductOwner } = require('../models/ProductOwner.js');

const router = express.Router();

//get one product owner details
router.get('/:id',async (req,res) => {
    const owner = await ProductOwner.findById(req.params.id);

    if(!owner){
        return res.status(404).json({ msg: 'No Product Found' })
    }

    //console.log(owner);
    return res.status(200).json({ owner })
});

//get all product owner details
router.get('/',async (req,res) => {
    const owners = await ProductOwner.find();
    return res.status(200).json({ owners })
});

//create new owner
router.post('/',async (req,res) => {
    const { brandName, location, contactNumber, contactEmail } = req.body;

    const owner = new ProductOwner({
        brandName: brandName,
        location: location,
        contactNumber: contactNumber,
        contactEmail: contactEmail
    })

    await owner.save();
    return res.status(200).json({ owner })
});

//delete owner
router.delete('/:id',async (req,res) => {
    try{
        const owner = await ProductOwner.findById(req.params.id);

        if(!owner){
            return res.status(404).json({ msg: 'No Owner Found' })
        }

        await ProductOwner.findByIdAndRemove(req.params.id);
        return res.json({ msg: 'Owner removed' });

    }catch (err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;