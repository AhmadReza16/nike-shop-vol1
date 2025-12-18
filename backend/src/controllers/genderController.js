const Gender = require('../models/Gender');

// GET تمام جنسیت‌ها
exports.getAllGenders = async (req, res) => {
  try {
    const genders = await Gender.find().sort({ name: 1 });

    res.json({
      success: true,
      data: genders
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error in receiving genders' ,
      error: err.message
    });
  }
};

// POST ایجاد جنسیت جدید
exports.createGender = async (req, res) => {
  try {
    const { name, slug } = req.body;

    if (!name || !slug) {
      return res.status(400).json({
        success: false,
        message: 'Name and slug are required'
      });
    }

    const gender = new Gender({ name, slug });
    await gender.save();

    res.status(201).json({
      success: true,
      data: gender
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error in creating gender',
      error: err.message
    });
  }
};

// PUT بروزرسانی جنسیت
exports.updateGender = async (req, res) => {
  try {
    const gender = await Gender.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!gender) {
      return res.status(404).json({
        success: false,
        message: 'Gender not found'
      });
    }

    res.json({
      success: true,
      data: gender
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error updating gender',
      error: err.message
    });
  }
};

// DELETE حذف جنسیت
exports.deleteGender = async (req, res) => {
  try {
    const gender = await Gender.findByIdAndDelete(req.params.id);

    if (!gender) {
      return res.status(404).json({
        success: false,
        message: 'Gender not found'
      });
    }

    res.json({
      success: true,
      message: 'Gender successfully removed'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error deleting gender',
      error: err.message
    });
  }
};
