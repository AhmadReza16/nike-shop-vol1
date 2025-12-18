const ProductImage = require('../models/Image');

// GET تمام عکس‌های یک محصول
exports.getImagesByProduct = async (req, res) => {
  try {
    const images = await ProductImage.find({ productId: req.params.productId })
      .sort({ sortOrder: 1 });

    res.json({
      success: true,
      data: images
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving photos',
      error: err.message
    });
  }
};

// POST اضافه کردن عکس جدید
exports.uploadImage = async (req, res) => {
  try {
    const { productId, variantId, url, sortOrder, isPrimary } = req.body;

    if (!productId || !url) {
      return res.status(400).json({
        success: false,
        message: 'Product and image URL are required'
      });
    }

    const image = new ProductImage({
      productId,
      variantId,
      url,
      sortOrder: sortOrder || 0,
      isPrimary: isPrimary || false
    });

    await image.save();

    res.status(201).json({
      success: true,
      data: image
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error uploading photo',
      error: err.message
    });
  }
};

// PUT بروزرسانی عکس
exports.updateImage = async (req, res) => {
  try {
    const image = await ProductImage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Photo not found'
      });
    }

    res.json({
      success: true,
      data: image
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error updating photo',
      error: err.message
    });
  }
};

// DELETE حذف عکس
exports.deleteImage = async (req, res) => {
  try {
    const image = await ProductImage.findByIdAndDelete(req.params.id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Photo not found'
      });
    }

    res.json({
      success: true,
      message: 'Photo successfully deleted'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error deleting photo',
      error: err.message
    });
  }
};
