const express = require('express');
const router = express.Router();
const productController = require('../controllers/productControllerNew');

// GET تمام محصولات
router.get('/', productController.getAllProducts);

// GET محصول بر اساس ID
router.get('/:id', productController.getProductById);

// POST ایجاد محصول جدید
router.post('/', productController.createProduct);

// PUT بروزرسانی محصول
router.put('/:id', productController.updateProduct);

// DELETE حذف محصول
router.delete('/:id', productController.deleteProduct);

module.exports = router;
