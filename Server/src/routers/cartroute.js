const express = require("express");
const router = new express.Router();

const Cart = require("../models/cartitems");
const { getUserIdFromToken } = require("../helpers/jwt_helpers");

router.use(getUserIdFromToken);

// Add item to cart
router.post("/items", async (req, res) => {
  try {
    console.log("reqbody", req.body)
    const addCart = new Cart(req.body);
    const insertCart = await addCart.save();
    res.status(201).send(insertCart);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Get all cart items
router.get("/items", async (req, res) => {
  try {
    const getCarts = await Cart.find({ userid: req.body.userid }).populate("userid").populate("productid");
    res.status(201).send(getCarts);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Get cart item by id
router.get("/items/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const getCart = await Cart.findById(id).populate("userid").populate("productid");
    res.send(getCart);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch("/items/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const getCart = await Cart.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.send(getCart);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/items/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const getCart = await Cart.findByIdAndDelete(_id);
    res.send(getCart);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
