const mongoose = require('mongoose');
const validator = require('validator');

const guestSchema = new mongoose.Schema({
    name: { 
        type : String, 
        required: true,
        minlength: [3, 'Guest name must have at least 3 characters'],
    },
    email: { 
        type : String, 
        required: true, 
        trim: true ,
        validate: [validator.isEmail, 'Guest email might be invalid.'],
    },
    phone: {
        type: String,
        unique: true,
        trim: true,
        validate: [validator.isNumeric, 'GuestPhone number is not valid. Please check if you have entered chars insted of numbers.'],
        select: false, 
    },
});

const Guest = mongoose.model('guest', guestSchema);

module.exports = Guest;