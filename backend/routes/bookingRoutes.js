const express = require("express");
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.get('/getBooking/:id', bookingController.getBookingForId);

module.exports = router;