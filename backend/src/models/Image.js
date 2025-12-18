const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  variantId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductVariant' },
  url: { type: String, required: true },
  sortOrder: { type: Number, default: 0 },
  isPrimary: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('ProductImage', ImageSchema);
