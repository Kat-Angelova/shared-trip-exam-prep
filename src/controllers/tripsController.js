const express = require('express');

const tripsService = require('../services/tripsService.js');
const authService = require('../services/authService.js');

const { getErrorMessage } = require('../config/errorHandler.js');
const { isAuthenticated } = require('../middlewares/authMiddleware.js');
const { isOwner, isNotOwner } = require('../middlewares/guards.js');

const router = express.Router();

//get all trips
const getAllTrips = async (req, res) => {
    let trips = await tripsService.getAllTrips();

    res.render('trips/all-trips', { trips });
};

//create 
const renderCreateTrip = (req, res) => {
    res.render('trips/create');
};

const postCreateTrip = async (req, res) => {
    try {
        await tripsService.create({ ...req.body, creator: req.user._id });
        res.redirect('/trips/all-trips');
    } catch (error) {
        res.render('trips/create', { error: getErrorMessage(error)})
    }

};

//details
const getDetails = async (req, res) => {
    let trip = await tripsService.getOne(req.params.tripId);
    let tripData = await trip.toObject();

    const isCreator = tripData.creator == req.user?._id;
    const buddies = trip.getBuddies();

    const isAvailable = trip.seats > 0;
    const isJoinedByMe = trip.buddies.some(x => x._id == req.user?._id);
    
    res.render('trips/details', { ...tripData, isCreator, buddies, isAvailable, isJoinedByMe});
};

//join trip
const getJoinTrip = async (req, res) => {
    let trip = await tripsService.getOne(req.params.tripId);

    trip.buddies.push(req.user._id);
    tripsService.updateSeats(req.params.tripId);

    await trip.save();

    res.redirect(`/trips/details/${req.params.tripId}`);
};

//delete
const deleteTrip = async (req, res) => {
    await tripsService.deleteTrip(req.params.tripId);

    res.redirect('/trips/all-trips');
};

//edit
const renderEditTrip = async (req, res) => {  
    let trip = await tripsService.getOne(req.params.tripId);

    res.render('trips/edit', { ...trip.toObject()});
};

const postEditTrip = async (req, res) => {
    await tripsService.editOne(req.params.tripId, req.body);

    res.redirect(`/trips/details/${req.params.tripId}`);
}

//my-profile

const profilePage = async(req, res) => {
    let user = await authService.getMyProfile(req.user._id);
   
    res.render('auth/profile', { ...user });
}


router.get('/all-trips', getAllTrips);

router.get('/create', isAuthenticated, renderCreateTrip);
router.post('/create', isAuthenticated,  postCreateTrip);

router.get('/details/:tripId', getDetails);

router.get('/join/:tripId', isNotOwner, getJoinTrip);

router.get('/delete/:tripId', isOwner, deleteTrip);

router.get('/edit/:tripId', isOwner, renderEditTrip);
router.post('/edit/:tripId', isOwner, postEditTrip);

router.get('/my-profile', isAuthenticated, profilePage);

module.exports = router;