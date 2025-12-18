const mongoose = require('mongoose');

const ColorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  hex: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Color', ColorSchema);
