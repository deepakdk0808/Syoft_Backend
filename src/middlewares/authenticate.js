require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, "deepak123", (err, user) => {
      if (err) return reject(err);

      resolve(user);
    });
  });
};

module.exports=async(req,res,next)=>{
    if(!req.headers.authorization)
    return res.status(400).send({message:"authorization token1 was not valid"})

    if(!req.headers.authorization.startsWith("Bearer "))
    return res.status(400).send({message:"authorization token2 was not valid"})

    const token =req.headers.authorization.split(' ')[1]
 
    let user
    try {
         user =await verifyToken(token)
         
    } catch (error) {
        return res.status(400).send({message:"authorization token3 was not valid"})
    }
 
      req.user=user.user 
    //   console.log("user",req.user)   
    
    return next()
}