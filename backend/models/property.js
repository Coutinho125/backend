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
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    },
    // You might want to add these for more precise location data
    latitude: Number,
    longitude: Number
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
  images: [{ type: String }], // Store image URLs or file paths
  status: {
    type: String,
    enum: ['available', 'rented', 'removed'],
    default: 'available'
  },
  landlord: {
    type: String,
    required: true
  },
  tenantsApplied: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

// Create a compound index on address and landlord
propertySchema.index({
  'address.street': 1,
  'address.city': 1,
  'address.state': 1,
  'address.country': 1,
  'address.postalCode': 1,
  landlord: 1
}, { unique: true });

propertySchema.index({ 'address.city': 1, 'address.state': 1, 'address.country': 1 });

// You might also want to add an index on just the landlord field for faster queries
propertySchema.index({ landlord: 1 });

module.exports = mongoose.model('Property', propertySchema);
