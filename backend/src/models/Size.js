const mongoose = require('mongoose');

const SizeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  label: { type: String, required: true },
  sortOrder: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Size', SizeSchema);
