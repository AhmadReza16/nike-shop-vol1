const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  logoUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Brand', BrandSchema);
