const Property = require('../models/Property');

// Add a new property (Landlord only)
exports.addProperty = async (req, res) => {
  console.log(req.body);
  const { title, description, address, price, size, numberOfRooms, images } = req.body;
  // const landlord = req.userId;
  const landlord = "673094b7ec9cc032b6a445cf";

  try {
    const newProperty = new Property({
      title,
      description,
      address,
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
  const { location, minPrice, maxPrice, bedrooms, amenities } = req.query;

  let query = {};
  if (location) query.address = { $regex: location, $options: 'i' };
  if (minPrice) query.price = { $gte: minPrice };
  if (maxPrice) query.price = { ...query.price, $lte: maxPrice };
  if (bedrooms) query.numberOfRooms = bedrooms;
  if (amenities) query.amenities = { $all: amenities.split(',') };

  try {
    const properties = await Property.find(query);
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: 'Error searching properties' });
  }
};
