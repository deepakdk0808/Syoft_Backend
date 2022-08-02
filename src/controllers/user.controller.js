const express=require('express')
const router =express.Router()

const User=require("../models/users")

router.post('', async (req, res) => {
    try {
        const user = await User.create(req.body)
        return res.send(user)
    } catch (error) {
        return res.send(error)
    }
})

router.get('', async (req, res) => {
    try {
        const user = await User.find().lean().exec()
        res.send(user)
    } catch (error) {
        res.send(error)
    }
})


module.exports=router