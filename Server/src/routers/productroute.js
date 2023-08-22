const express = require("express")
const router = new express.Router()

const Product = require("../models/products")

router.post("/products",async (req,res)=>{
    try{
        const addProduct = new Product(req.body)
        const insertProduct = await addProduct.save()
        res.status(201).send(insertProduct)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get("/products",async (req,res)=>{
    try{
        const getProducts = await Product.find({})
        res.status(201).send(getProducts)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get("/products/:id",async (req,res)=>{
    try{
        const id = req.params.id;
        const getProduct = await Product.findOne({id})
        res.send(getProduct)
    }catch(e){
        res.status(400).send(e)
    }
})


// productroute.js



// router.get("/products/:id", async (req, res) => {
//     try {
//       const _id = mongoose.Types.ObjectId(req.params.id); // Convert to ObjectId
//       const getProduct = await Product.findById(_id);
//       if (!getProduct) {
//         return res.status(404).send("Product not found");
//       }
//       res.send(getProduct);
//     } catch (e) {
//       res.status(500).send(e);
//     }
//   });
  

  

router.patch("/products/:id",async (req,res)=>{
    try{
        const _id = req.params.id;
        const getProduct = await Product.findByIdAndUpdate(_id,req.body,{
            new:true
        })
        res.send(getProduct)    
    }catch(e){
        res.status(500).send(e)
    }
})
// router.get("/products/:id", async (req, res) => {
//     try {
//         const id = req.params.id; // Custom id assigned to the product
//         const getProduct = await Product.findOne({ id: id }); // Searching by custom id field
//         if (!getProduct) {
//             return res.status(404).send("Product not found");
//         }
//         res.send(getProduct);
//     } catch (e) {
//         res.status(400).send(e);
//     }
// });



router.delete("/products/:id",async (req,res)=>{
    try{
        const _id = req.params.id;
        const getProduct = await Product.findByIdAndDelete(_id)
        res.send(getProduct)
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports = router;