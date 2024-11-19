const express = require('express');
const { addProperty, updateProperty, getProperties, searchProperties } = require('../controllers/propertyController');
const router = express.Router();

router.post('/add' , addProperty);
router.post('/edit/:id', updateProperty);
router.get('/all', getProperties);
router.get('/search', searchProperties);  // Advanced search based on filters

module.exports = router;
