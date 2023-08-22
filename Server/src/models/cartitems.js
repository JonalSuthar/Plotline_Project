const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
//   id: { type: String, required: true, unique: true },
  userid: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
  productid: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
  quantity: { type: String, required: true },
  tax: { type: Number, required: true },
  subtotal: { type: Number },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
