const Color = require('../models/Color');

// GET تمام رنگ‌ها
exports.getAllColors = async (req, res) => {
  try {
    const colors = await Color.find().sort({ name: 1 });

    res.json({
      success: true,
      data: colors
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving colors',
      error: err.message
    });
  }
};

// POST ایجاد رنگ جدید
exports.createColor = async (req, res) => {
  try {
    const { name, slug, hex } = req.body;

    if (!name || !slug || !hex) {
      return res.status(400).json({
        success: false,
        message: 'Name, slug and hex are required'
      });
    }

    const color = new Color({ name, slug, hex });
    await color.save();

    res.status(201).json({
      success: true,
      data: color
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error creating color',
      error: err.message
    });
  }
};

// PUT بروزرسانی رنگ
exports.updateColor = async (req, res) => {
  try {
    const color = await Color.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!color) {
      return res.status(404).json({
        success: false,
        message: 'Color not found'
      });
    }

    res.json({
      success: true,
      data: color
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error updating color',
      error: err.message
    });
  }
};

// DELETE حذف رنگ
exports.deleteColor = async (req, res) => {
  try {
    const color = await Color.findByIdAndDelete(req.params.id);

    if (!color) {
      return res.status(404).json({
        success: false,
        message:'Color not found'
      });
    }

    res.json({
      success: true,
      message: 'Color successfully removed'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error removing color' ,
      error: err.message
    });
  }
};
