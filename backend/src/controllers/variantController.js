const ProductVariant = require('../models/Variant');
const Product = require('../models/Product');

// GET تمام variants یک محصول
exports.getVariantsByProduct = async (req, res) => {
  try {
    const variants = await ProductVariant.find({ productId: req.params.productId })
      .populate('colorId')
      .populate('sizeId');

    res.json({
      success: true,
      data: variants
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error getting variants',
      error: err.message
    });
  }
};

// POST ایجاد variant جدید
exports.createVariant = async (req, res) => {
  try {
    const { productId, sku, price, salePrice, colorId, sizeId, inStock, weight, dimensions } = req.body;

    if (!productId || !sku || !price || !colorId || !sizeId) {
      return res.status(400).json({
        success: false,
        message: 'Fill in all required fields'
      });
    }

    // بررسی وجود محصول
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const variant = new ProductVariant({
      productId,
      sku,
      price,
      salePrice,
      colorId,
      sizeId,
      inStock,
      weight,
      dimensions
    });

    await variant.save();

    res.status(201).json({
      success: true,
      data: variant
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error creating variant',
      error: err.message
    });
  }
};

// PUT بروزرسانی variant
exports.updateVariant = async (req, res) => {
  try {
    const variant = await ProductVariant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('colorId').populate('sizeId');

    if (!variant) {
      return res.status(404).json({
        success: false,
        message: 'variant not found'
      });
    }

    res.json({
      success: true,
      data: variant
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error updating variant',
      error: err.message
    });
  }
};

// DELETE حذف variant
exports.deleteVariant = async (req, res) => {
  try {
    const variant = await ProductVariant.findByIdAndDelete(req.params.id);

    if (!variant) {
      return res.status(404).json({
        success: false,
        message: 'variant not found'
      });
    }

    res.json({
      success: true,
      message: 'variant successfully deleted'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error deleting variant',
      error: err.message
    });
  }
};
