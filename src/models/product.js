const mongoose=require('mongoose')


const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    productPrice: { type: String, required: true },
    productDescription: { type: String, required: true },
    inventoryCount:{ type: String, required: true },
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:"users",required:true }
    },
    {
    timestamps:true,
    versionKey:false
})


const Product = mongoose.model('product', productSchema)

module.exports=Product

 