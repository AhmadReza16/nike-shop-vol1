const Brand = require('../models/Brand');

// GET تمام برندها
exports.getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find().sort({ name: 1 });

    res.json({
      success: true,
      data: brands
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving brands',
      error: err.message
    });
  }
};

// GET برند بر اساس ID
exports.getBrandById = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found'
      });
    }

    res.json({
      success: true,
      data: brand
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error in receiving the brand',
      error: err.message
    });
  }
};

// POST ایجاد برند جدید
exports.createBrand = async (req, res) => {
  try {
    const { name, slug, logoUrl } = req.body;

    if (!name || !slug) {
      return res.status(400).json({
        success: false,
        message: 'Name and slug are required.'
      });
    }

    const existingBrand = await Brand.findOne({ slug });
    if (existingBrand) {
      return res.status(400).json({
        success: false,
        message: 'This slug has already been used.'
      });
    }

    const brand = new Brand({
      name,
      slug,
      logoUrl
    });

    await brand.save();

    res.status(201).json({
      success: true,
      data: brand
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: ' Error in creating a brand',
      error: err.message
    });
  }
};

// PUT بروزرسانی برند
exports.updateBrand = async (req, res) => {
  try {
    const { name, slug, logoUrl } = req.body;

    const brand = await Brand.findByIdAndUpdate(
      req.params.id,
      { name, slug, logoUrl },
      { new: true }
    );

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: ' Brand not found'
      });
    }

    res.json({
      success: true,
      data: brand
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error updating brand',
      error: err.message
    });
  }
};

// DELETE حذف برند
exports.deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: ' Brand not found'
      });
    }

    res.json({
      success: true,
      message: ' Brand successfully deleted.'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: ' Error deleting brand',
      error: err.message
    });
  }
};
