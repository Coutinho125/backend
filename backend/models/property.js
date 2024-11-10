const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  numberOfRooms: {
    type: Number,
    required: true
  },
  amenities: [String],
  images: [String],  // Store image URLs or file paths
  floorPlan: String,  // Store the floor plan image URL or path
  status: {
    type: String,
    enum: ['available', 'rented', 'removed'],
    default: 'available'
  },
  landlord: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  tenantsApplied: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

module.exports = mongoose.model('Property', propertySchema);
