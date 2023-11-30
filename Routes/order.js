const express = require("express");
const router = express.Router();

const Order = require("../Models/Order");

router.post("/", async(req,res)=>{
    try{
  
      const newOrder = new Order(req.body);
      await newOrder.save();
      return res.status(200).json({message:"placed"});
    }catch(err){
         res.status(500).json({message:"Error in ordering"});
    }
})

module.exports = router;