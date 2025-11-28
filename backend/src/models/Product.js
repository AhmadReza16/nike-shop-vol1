const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, default: 'Nike' },
  description: String,
  price: { type: Number, required: true },
  sizes: [String], // e.g. ["40", "41", "42"]
  images: [String], // urls
  countInStock: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);