const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Category', CategorySchema);
