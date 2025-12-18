const Size = require('../models/Size');

// GET تمام سایزها
exports.getAllSizes = async (req, res) => {
  try {
    const sizes = await Size.find().sort({ sortOrder: 1 });

    res.json({
      success: true,
      data: sizes
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving sizes',
      error: err.message
    });
  }
};

// POST ایجاد سایز جدید
exports.createSize = async (req, res) => {
  try {
    const { name, slug, label, sortOrder } = req.body;

    if (!name || !slug || !label) {
      return res.status(400).json({
        success: false,
        message: 'Name, slug and label are required'
      });
    }

    const size = new Size({ name, slug, label, sortOrder: sortOrder || 0 });
    await size.save();

    res.status(201).json({
      success: true,
      data: size
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error creating size',
      error: err.message
    });
  }
};

// PUT بروزرسانی سایز
exports.updateSize = async (req, res) => {
  try {
    const size = await Size.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!size) {
      return res.status(404).json({
        success: false,
        message: 'Size not found'
      });
    }

    res.json({
      success: true,
      data: size
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error updating size',
      error: err.message
    });
  }
};

// DELETE حذف سایز
exports.deleteSize = async (req, res) => {
  try {
    const size = await Size.findByIdAndDelete(req.params.id);

    if (!size) {
      return res.status(404).json({
        success: false,
        message: 'Size not found'
      });
    }

    res.json({
      success: true,
      message: 'Size successfully deleted'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error deleting size',
      error: err.message
    });
  }
};
