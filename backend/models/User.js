const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    enum: ['tenant', 'landlord'],
    required: true
  },
  savedProperties: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property'
  }],
  bookingHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rental'
  }]
});

module.exports = mongoose.model('User', userSchema);
