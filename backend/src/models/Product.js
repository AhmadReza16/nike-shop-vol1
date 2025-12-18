const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  genderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gender' },
  brandId: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
  isPublished: { type: Boolean, default: false },
  defaultVariantId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductVariant' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Index برای جستجو
ProductSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', ProductSchema);