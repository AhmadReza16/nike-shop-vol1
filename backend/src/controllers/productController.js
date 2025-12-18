const Product = require('../models/Product');

// GET all products with filters
exports.getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const filters = {};
    
    // Filter by brand
    if (req.query.brand) {
      filters.brand = req.query.brand;
    }
    
    // Filter by price range
    if (req.query.minPrice || req.query.maxPrice) {
      filters.price = {};
      if (req.query.minPrice) filters.price.$gte = parseFloat(req.query.minPrice);
      if (req.query.maxPrice) filters.price.$lte = parseFloat(req.query.maxPrice);
    }
    
    // Search by name or description
    if (req.query.search) {
      filters.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    const products = await Product.find(filters)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Product.countDocuments(filters);

    res.json({
      success: true,
      data: {
        products,
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
      message: 'Error receiving products' ,
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// GET single product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ 
        success: false,
        message: 'Product ID is invalid'
      });
    }

    const product = await Product.findById(id).lean();
    
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
      message: 'Error receiving product',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// CREATE new product
exports.createProduct = async (req, res) => {
  try {
    const { name, brand, description, price, sizes, images, countInStock } = req.body;

    // Validation
    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: 'Name and price are required'
      });
    }

    const product = new Product({
      name,
      brand: brand || 'Nike',
      description,
      price,
      sizes: sizes || [],
      images: images || [],
      countInStock: countInStock || 0
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error creating product',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// UPDATE product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ 
        success: false,
        message: 'Product ID is invalid'
      });
    }

    const product = await Product.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error updating product',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// DELETE product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ 
        success: false,
        message: 'Product ID is invalid'
      });
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product successfully deleted'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};
