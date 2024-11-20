const Booking = require('../models/Booking');
const {getUserById} = require("./userController");
const {getPropertyDataById} = require("./propertyController");

exports.getBookingForId = async (req, res) => {
    console.log("inside getbooking for Id" )
    const userId = req.params.id

    // find if user is tenant or landlord
    const user = await getUserById(userId)
    console.log(user)
    const userType = user.userType;

    if("landlord" === userType) {
        console.log("inside landlord user bookings")

    } else {
        console.log("inside tenant user bookings")

        const bookings = await Booking
            .find({ tenantId: userId })
            .sort({ startDate: -1 }) // -1 for descending order
            .exec();

        console.log(bookings)

        getPropertyAndBookings(bookings)
            .then(result => {
                console.log("Final result:", result);
                res.json(result)
                // Do something with the result
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }
}

const getPropertyAndBookings = async(bookings) => {
    return await Promise.all(bookings.map(async x => {
        const propertyId = x.propertyId;
        const property = await getPropertyDataById(propertyId);

        return {
            bookingId: x._id,
            tenantId: x.tenantId,
            landlordId: x.landlordId,
            propertyId: x.propertyId,
            title: property.title,
            price: property.price,
            address: property.address,
            size: property.size,
            numberOfRooms: property.numberOfRooms,
            bookingStatus: x.status
        };
    }));
}

