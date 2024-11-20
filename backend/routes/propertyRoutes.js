const express = require('express');
const { addProperty, updateProperty, getProperties, searchProperties, applyProperty,
    getLandlordProperties, getPropertyById, deletePropertyById } = require('../controllers/propertyController');
const router = express.Router();

router.post('/add' , addProperty);
router.post('/edit/:id', updateProperty);
router.get('/all', getProperties);
router.get('/search', searchProperties);  // Advanced search based on filters
router.post('/getLandlordProperties', getLandlordProperties);  // Advanced search based on filters
router.get('/getPropertyById/:id', getPropertyById);  // Advanced search based on filters
router.delete('/deletePropertyById/:id', deletePropertyById);  // Advanced search based on filters
router.post('/applyProperty', applyProperty);  // Advanced search based on filters

module.exports = router;
