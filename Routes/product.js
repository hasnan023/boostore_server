const express = require("express");
const router = express.Router();
const multer = require('multer');
const product = require("../Models/Product");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        console.log(file);
      cb(null, file.originalname);
    },
    
  });
  const upload = multer({ storage: storage });

router.post("/addProduct",upload.single('image'), async (req,res)=>{
        try{
        console.log(req.body);
        const { name,price,description, category} = req.body;
        let image = 'uploads/' + req.file.filename;
        //const image = 'uploads/' + req.file.filename;
        console.log(req.body);
        // console.log(pm.res.json());
        const productDetails = new product({
            name :name,
            price : price,
            description : description,
            category:category,
            image: image
        });
        console.log(productDetails);
        await productDetails.save();
        return res.send(productDetails);        
    }catch(err){
        return res.status(500).send(err);
    }
});

router.get("/",async (req,res)=>{
    try{
        const products= await product.find();
        res.json(products);
    }
    catch(error){
        res.status(500).json({error})
    };
});

router.get("/:id",async(req,res)=>{
    try{
        const productId =req.params.id;
        const Product= await product.findById(productId);
        res.json(Product);
    }
    catch (error){
        console.error("Error fetching products:", error);
     res.status(500).json({ error: "Internal Server Error" });
   
};
});
router.put("/:id", upload.single('image'), async(req, res)=>{
    try{
        const productId  = req.params.id;
        const { name, price, description ,category} = req.body;
        let image= null;
        if(req.file){
            console.log(req.file);
            image = 'uploads/' + req.file.filename;
        }
        const Product = await product.findById(productId);
        if(!Product){
            return res.status(404).send({mesg:"not found"});
        }        
        Product.name = name;
        Product.price = price;
        Product.description = description;
        Product.category = category;
        if(image){
            Product.image = image;
        }
            await Product.save();
            console.log(image);
            console.log(Product);
            return res.send({message:"product updated"})
        }catch(error){
            return res.status(500).send({message:"failed in updating"});
        }
        });

        router.delete("/:id", async (req,res)=>{
            try{
                
                const productId = req.params.id;
                const Product = await product.findById(productId); 
                if(Product){
                    await Product.deleteOne();
                    return res.send({message:"deleted success"})
                }
                return res.status(404).send({message:"not found"});
                
            }catch(error){
                res.status(500).send({error:"failed in deleting"})
            }
        })

module.exports=router;