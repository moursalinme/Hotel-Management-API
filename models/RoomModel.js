const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomNumber: { 
        type: Number, 
        required: true, 
        unique: [true, 'There is alrady a room with the same room number.']
    },
    type: { type: String, required: true },
    description: { type: String },
    stars: { type: Number, required: true },
    price: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true }
});

const Room = mongoose.model('room', roomSchema);

module.exports = Room;