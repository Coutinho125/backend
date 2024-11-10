const express = require('express');
const { createRental, getRentalDetails, confirmBooking } = require('../controllers/rentalController');
const router = express.Router();

router.post('/create', createRental);
router.get('/:id', getRentalDetails);
router.put('/confirm/:id', confirmBooking);

module.exports = router;
