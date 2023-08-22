const express = require('express');
const router = express.Router();
const Order = require('../models/orderdata');
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

router.post("/orders",async (req,res)=>{
    try{
        const addOrder = new Order(req.body)
        const insertOrder = await addOrder.save()
        res.status(201).send(insertOrder)
    }catch(e){
        res.status(400).send(e)
    }
})


module.exports = router;
