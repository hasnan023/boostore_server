const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({

    product:[{
    name:{
        type:String,
        required:true
    },
    productId:{
       type:String,
       required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    quantity:{
        type: Number,
        required:true
    }
}],
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    paymentMethod:{
        type:String,
        required:true
    },
    totalBill:{
        type:Number,
        required:true
    }
});
module.exports = mongoose.model("order", OrderSchema);