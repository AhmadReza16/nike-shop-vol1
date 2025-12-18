const express = require('express');
const router = express.Router();
const genderController = require('../controllers/genderController');

router.get('/', genderController.getAllGenders);
router.post('/', genderController.createGender);
router.put('/:id', genderController.updateGender);
router.delete('/:id', genderController.deleteGender);

module.exports = router;
