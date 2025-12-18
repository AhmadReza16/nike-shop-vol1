const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

router.get('/product/:productId', imageController.getImagesByProduct);
router.post('/', imageController.uploadImage);
router.put('/:id', imageController.updateImage);
router.delete('/:id', imageController.deleteImage);

module.exports = router;
