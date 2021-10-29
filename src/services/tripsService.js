const Trip = require('../models/Trip.js');

exports.create = (tripData) => Trip.create(tripData);

exports.getAllTrips = () => Trip.find().lean();

exports.getOne = (tripId) => Trip.findById(tripId).populate('buddies');

exports.updateSeats = async (tripId) => {
    const filter = { _id: tripId };
    const update = { $inc: { seats: -1 }};
    let result = await Trip.updateOne(filter, update, { runValidators: true});

    return result;
};

exports.deleteTrip = (tripId) => Trip.findByIdAndDelete(tripId);

exports.editOne = (tripId, tripData) => Trip.findByIdAndUpdate(tripId, tripData);

