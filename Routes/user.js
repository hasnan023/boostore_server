const express = require("express");
const router = express.Router();
const User = require("../Models/User");

router.post("/register", async(req,res)=>{
    try{
    //const{ name,email,password} = req.body;
    const SignUpDetails = new User(req.body);
    await SignUpDetails.save();
    res.status(201).json({message:"registered successfully"});
    }catch(err){
        res.status(500).json({message:"failed to register"});
    }
});

router.post("/login",async(req,res)=>{
    try{
        const {email,password}= req.body;
        const user = await User.findOne({email});
        if(user && (password == user.password)){

            return(res.send({message:"login Successful", user:{email:user.email}}));
}

      }catch(error){
        console.error("error" , error);
        
      }
    
})
module.exports = router;