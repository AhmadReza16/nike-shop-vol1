const Product = require('../models/Product');
const ProductVariant = require('../models/Variant');
const ProductImage = require('../models/Image');

// GET all products with filter and pagination
exports.getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const filters = { isPublished: true };
    
    // Filter by brand
    if (req.query.brandId) {
      filters.brandId = req.query.brandId;
    }
    
    // Filter by category
    if (req.query.categoryId) {
      filters.categoryId = req.query.categoryId;
    }
    
    // Filter by gender
    if (req.query.genderId) {
      filters.genderId = req.query.genderId;
    }
    
    // Search by name or description
    if (req.query.search) {
      filters.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    const products = await Product.find(filters)
      .populate('categoryId', 'name slug')
      .populate('brandId', 'name slug logoUrl')
      .populate('genderId', 'name slug')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Product.countDocuments(filters);

    // برای هر محصول، variants و images را بگیریم
    const productsWithDetails = await Promise.all(
      products.map(async (product) => {
        const variants = await ProductVariant.find({ productId: product._id })
          .populate('colorId', 'name hex')
          .populate('sizeId', 'name label')
          .lean();
        
        const images = await ProductImage.find({ productId: product._id })
          .sort({ sortOrder: 1 })
          .lean();
        
        return {
          ...product,
          variants,
          images
        };
      })
    );

    res.json({
      success: true,
      data: {
        products: productsWithDetails,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error receiving products',
      error: err.message
    });
  }
};

// GET محصول بر اساس ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('categoryId', 'name slug')
      .populate('brandId', 'name slug logoUrl')
      .populate('genderId', 'name slug');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const variants = await ProductVariant.find({ productId: product._id })
      .populate('colorId')
      .populate('sizeId');

    const images = await ProductImage.find({ productId: product._id })
      .sort({ sortOrder: 1 });

    res.json({
      success: true,
      data: {
        ...product.toObject(),
        variants,
        images
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error receiving product',
      error: err.message
    });
  }
};

// POST ایجاد محصول جدید
exports.createProduct = async (req, res) => {
  try {
    const { name, description, categoryId, brandId, genderId } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: 'Name and description are required'
      });
    }

    const product = new Product({
      name,
      description,
      categoryId,
      brandId,
      genderId,
      isPublished: false
    });

    await product.save();

    res.status(201).json({
      success: true,
      data: product
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error creating product',
      error: err.message
    });
  }
};

// PUT بروزرسانی محصول
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, categoryId, brandId, genderId, isPublished } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        categoryId,
        brandId,
        genderId,
        isPublished,
        updatedAt: Date.now()
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error updating product',
      error: err.message
    });
  }
};

// DELETE حذف محصول
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // حذف تمام variants و images
    await ProductVariant.deleteMany({ productId: req.params.id });
    await ProductImage.deleteMany({ productId: req.params.id });

    res.json({
      success: true,
      message: 'Product successfully deleted'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: err.message
    });
  }
};
