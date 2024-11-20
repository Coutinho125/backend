const Property = require('../models/Property');
const Booking = require('../models/Booking');

// Add a new property (Landlord only)
exports.addProperty = async (req, res) => {
  console.log("inside add property")
  console.log(req.body);
  console.log("finished req.body printing")
  const { title, description, address, price, size, numberOfRooms, images, landlord } = req.body;

  if (!address.street || !address.city || !address.state || !address.country || !address.postalCode) {
    return res.status(500).json({ message: 'Missing required address fields' });
  }

  try {
    const newProperty = new Property({
      title,
      description,
      address: {
        street: address.street,
        city: address.city,
        state: address.state,
        country: address.country,
        postalCode: address.postalCode, // This will be undefined if not provided
        latitude: address.latitude,
        longitude: address.longitude
      },
      price,
      size,
      numberOfRooms,
      images,
      landlord
    });

    await newProperty.save();
    res.status(201).json({ message: 'Property added successfully', property: newProperty });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a property (Landlord only)
exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Property updated successfully', property });
  } catch (err) {
    res.status(500).json({ message: 'Error updating property' });
  }
};

// Get all properties
exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate('landlord', 'username email');
    console.log(properties);
    res.json(properties);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Search properties based on filters
exports.searchProperties = async (req, res) => {
  // const { location, minPrice, maxPrice, bedrooms, amenities } = req.query;
  const { city, numberOfRooms } = req.query;
  let query = {};

  if (city) {
    query['address.city'] = city;
  }

  if (numberOfRooms) {
    query.numberOfRooms = numberOfRooms;
  }

  try {
    console.log(`querying for ${query}`);
    const properties = await Property.find(query);
    console.log(properties)
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: 'Error searching properties' });
  }
};

exports.getLandlordProperties = async (req, res) => {
  console.log("inside getLandlordProperties");
  const landlordId = req.body.landlord;
  console.log("landlordId " + landlordId);

  try {
    const properties = await Property.find({ landlord: landlordId });
    console.log(properties)
    res.json(properties);
  } catch (error) {
    console.error('Error fetching landlord properties:', error);
    throw error;
  }
};

exports.getPropertyById = async (req, res) => {
  console.log("inside getPropertyById")
  try {
    const propertyId = req.params.id;
    const property = await Property.findById(propertyId);

    res.json(property);
  } catch (error) {
    console.error('Error fetching property:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getPropertyDataById = async(propertyId) => {
  try {
    const property = await Property.findById(propertyId);

    if (!property) {
      return
    }
    return property;
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

exports.deletePropertyById = async (req, res) => {
  console.log("inside deletePropertyById")
  try {
    const propertyId = req.params.id;

    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    await Property.findByIdAndDelete(propertyId);

    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.applyProperty = async (req, res) => {
  console.log("inside applyProperty")
  console.log(req.body)
  try {
    const {propertyId, tenantId} = req.body;

    const property = await Property.findById(propertyId);

    console.log('found prop')
    console.log(property)

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (property.tenantsApplied.includes(tenantId)) {
      return res.status(400).json({ message: 'Tenant has already applied for this property' });
    }

    property.tenantsApplied.push(tenantId);

    const landlordId = property.landlord;
    const price = property.price;
    console.log(landlordId);

    const newBooking = new Booking({
      tenantId,
      landlordId,
      propertyId,
      price
    });

    // Save the updated property
    await property.save();
    await newBooking.save();

    res.status(200).json({ message: 'Application submitted successfully', property, booking: newBooking });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

