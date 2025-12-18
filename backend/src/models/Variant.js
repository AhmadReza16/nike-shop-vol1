const mongoose = require('mongoose');

const VariantSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  sku: { type: String, required: true, unique: true },
  price: { type: mongoose.Decimal128, required: true },
  salePrice: { type: mongoose.Decimal128 },
  colorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Color', required: true },
  sizeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Size', required: true },
  inStock: { type: Number, default: 0 },
  weight: { type: Number },
  dimensions: { type: mongoose.Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('ProductVariant', VariantSchema);
