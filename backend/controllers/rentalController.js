const Rental = require('../models/Rental');
const Property = require('../models/Property');

// Create a new rental application (Tenant)
exports.createRental = async (req, res) => {
  const { propertyId, startDate, endDate } = req.body;
  const tenant = req.userId;

  try {
    const property = await Property.findById(propertyId);
    if (!property || property.status !== 'available') {
      return res.status(400).json({ message: 'Property is not available' });
    }

    const rental = new Rental({
      tenant,
      property: propertyId,
      startDate,
      endDate
    });

    await rental.save();
    property.tenantsApplied.push(tenant);
    await property.save();

    res.status(201).json({ message: 'Rental application submitted successfully', rental });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting rental application' });
  }
};

// Get rental details
exports.getRentalDetails = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id).populate('tenant property');
    res.json(rental);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching rental details' });
  }
};

// Confirm a rental booking (Landlord)
exports.confirmBooking = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);
    rental.status = 'confirmed';
    await rental.save();
    res.json({ message: 'Rental confirmed successfully', rental });
  } catch (err) {
    res.status(500).json({ message: 'Error confirming booking' });
  }
};
