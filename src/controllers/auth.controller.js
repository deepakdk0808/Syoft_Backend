require('dotenv').config()
const jwt=require('jsonwebtoken')
const User=require('../models/users')

const newToken=(user)=>{
        //  console.log(process.env)                      /////error while fetching env file,cant able to fetch process.env
    return jwt.sign({user},"deepak123")
 }

const register=async(req,res)=>{
    try {
        let user=await User.findOne({email:req.body.email}).lean().exec()
        if(user) 
        return res.status(400).send({message:"try another email"})
 
        user=await User.create(req.body)

        const token=newToken(user)

       return res.send({user,token})
    } catch (error) {
       return res.status(500).send(error.message)              ///not getting in post request because of .env file
    }
}

const login = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (!user)
       return res.status(400).send({ message: "Please try another email or password" });
  
      const match = user.checkPassword(req.body.password);
  
      if (!match)
        return res.status(400).send({ message: "Please try another email or password" });
  
      const token = newToken(user);

      res.send({ user, token });
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

module.exports={register,login}