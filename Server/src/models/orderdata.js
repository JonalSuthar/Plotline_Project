const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: [{
    type: String,
    required: true
  }],
  totalItems: {
    type: Number,
    required: true
  },
  subtotal: {
    type: Number,
    required: true
  },
  totalTax: {
    type: Number,
    required: true
  },
  orderTotal: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
