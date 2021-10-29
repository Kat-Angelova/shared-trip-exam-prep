const tripsService = require('../services/tripsService.js');

exports.isOwner = async function(req, res, next) {
    let trip = await tripsService.getOne(req.params.tripId);

    if(trip.creator == req.user._id) {
        next()
    } else {
        res.redirect(`/trips/details/${req.params.tripId}`);
    }
};

exports.isNotOwner = async function(req, res, next) {
    let trip = await tripsService.getOne(req.params.tripId);
   
    if(trip.creator != req.user._id) {
        next();
    } else {
        res.redirect(`/trips/details/${req.params.tripId}`);
    }
};
