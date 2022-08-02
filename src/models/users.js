const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true,unique:true },
    password:{type:String,required:true},
    phone:{type:String,required:true}
},{
    timestamps:true,
    versionKey:false
})


userSchema.pre("save",function(next){
 if(!this.isModified('password')) return next()     //used for registering to check for changed password
 var hash = bcrypt.hashSync(this.password,8)
 this.password=hash
 return next()
})

userSchema.methods.checkPassword=function(password){       //used while logging in
    return bcrypt.compareSync(password,this.password)
}

const User = mongoose.model('user', userSchema)

module.exports=User

 