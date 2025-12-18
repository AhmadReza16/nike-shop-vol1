const Category = require('../models/Category');

// GET تمام دسته‌بندی‌ها
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('parentId', 'name slug').sort({ name: 1 });

    res.json({
      success: true,
      data: categories
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving categories',
      error: err.message
    });
  }
};

// GET دسته‌بندی بر اساس ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate('parentId');

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.json({
      success: true,
      data: category
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving category',
      error: err.message
    });
  }
};

// POST ایجاد دسته‌بندی جدید
exports.createCategory = async (req, res) => {
  try {
    const { name, slug, parentId } = req.body;

    if (!name || !slug) {
      return res.status(400).json({
        success: false,
        message: 'Name and slug are required'
      });
    }

    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: 'This slug has already been used'
      });
    }

    const category = new Category({
      name,
      slug,
      parentId
    });

    await category.save();

    res.status(201).json({
      success: true,
      data: category
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error creating category',
      error: err.message
    });
  }
};

// PUT بروزرسانی دسته‌بندی
exports.updateCategory = async (req, res) => {
  try {
    const { name, slug, parentId } = req.body;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, slug, parentId },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.json({
      success: true,
      data: category
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error updating category',
      error: err.message
    });
  }
};

// DELETE حذف دسته‌بندی
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.json({
      success: true,
      message: 'Category successfully deleted'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error deleting category' ,
      error: err.message
    });
  }
};
