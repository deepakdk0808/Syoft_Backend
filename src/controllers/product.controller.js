const express=require('express')
const router =express.Router()
const authenticate=require('../middlewares/authenticate')

const Product=require("../models/product")

router.post('', authenticate, async (req, res) => {
    try {
        console.log("req",req.user)
        const userID=req.user._id
        const product = await Product.create({
            productName:req.body.productName,
            productPrice:req.body.productPrice,
            productDescription:req.body.productDescription,
            inventoryCount:req.body.inventoryCount,
            user_id:userID,
        })
        return res.send(product)
    } catch (error) {
        return res.send(error)
    }
})

router.patch('/:id', authenticate, async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
        return res.send(product)
    } catch (error) {
        return res.send(error)
    }
})

router.get('', async (req, res) => {
    try {
        const product = await Product.find().lean().exec()
        res.send(product)
    } catch (error) {
        res.send(error)
    }
})



module.exports=router