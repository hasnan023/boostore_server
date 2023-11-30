const express =  require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require('multer');
const path = require("path");
const productRoute = require("./Routes/product");
const paymentRoute = require("./Routes/payment");
const orderRoute = require("./Routes/order");

//const db = "mongodb://localhost:27017/Store"
const db = "mongodb+srv://hasnan:hasnan023@cluster0.tugsl7l.mongodb.net/"

app.use("/uploads",express.static(path.join(__dirname,"uploads")));

app.use(cors());
app.use(express.json());
app.use("/api/product",productRoute);
app.use("/api/payments",paymentRoute);
app.use("/api/order", orderRoute);

mongoose.connect(db,{}).then(()=>{
    console.log("connection successful");
}).catch((err)=> console.log("no connection"));


app.listen(5002,()=>{
    console.log("backend is running");
})