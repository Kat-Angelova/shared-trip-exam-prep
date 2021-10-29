const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    startPoint: {
        type: String,
        required: [true, 'All fields are required!'],
        minlength: [4, 'The start point should be at least 4 characters!']
    },
    endPoint: {
        type: String,
        required: [true, 'All fields are required!'],
        minlength: [4, 'The ent point should be at least 4 characters!']
    },
    date: {
        type: String,
        required: [true, 'All fields are required!']
    },
    time: {
        type: String,
        required: [true, 'All fields are required!']
    },
    carImage: {
        type: String,
        required: [true, 'All fields are required!'],
        match: [/^https?:\/\/.+/, 'Image URL is not in the valid format!']
    },
    carBrand: {
        type: String,
        required: [true, 'All fields are required!'],
        minlength: [4, 'Car brand should be at least 4 characters long!']
    },
    seats: {
        type: Number,
        required: [true, 'All fields are required!'],
        min: [0, 'The minimum seats should be zero - positive numbers!'],
        max: [4, 'The maximum seats should be 4!']
    },
    price: {
        type: Number,
        required: [true, 'All fields are required!'],
        min: [1, 'The minimum price for each trip is 1 euros/lv!'],
        max: [50, 'The maximum price for each trip should be 50 euros/lv!']
    },
    description: {
        type: String,
        required: [true, 'All fields are required!']
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    buddies: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ]
   
});

tripSchema.method('getBuddies', function() {
    return this.buddies.map(x => x.email).join(', ');
});


const Trip = mongoose.model('Trip', tripSchema);


module.exports = Trip;