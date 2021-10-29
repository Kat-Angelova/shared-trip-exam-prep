const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../constants.js');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'All fields are required!'],
        validate: [/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'This email format is not allowed!']
    },
    password: {
        type: String,
        required: [true, 'All fields are required!'],
        minlength: [4, 'Password must be at least 4 characters long.'],
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: [true, 'All fields are required!'],
    },
    tripsHistory: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Trip',
        } 
    ]

});

userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, SALT_ROUNDS)
        .then((hash) => {
            this.password = hash;

            return next();
        })

});

userSchema.method('validatePassword', function(password) {
    return bcrypt.compare(password, this.password);

});

userSchema.method('getTripsHistory', function() {
    return this.tripsHistory;
});

const User = mongoose.model('User', userSchema);


module.exports = User;
