const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    roomId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Room', 
        required: true 
    },
    guestId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Guest', 
        required: true 
    },
    startDate: { 
        type: String, 
        required: true 
    },
    durationInDays: {
        type: Number,
        requied: true,
    },
    endDate: { 
        type: String, 
        required: true 
    },
    price: { type: Number },
});

const Reservation = mongoose.model('reservation', reservationSchema);
module.exports = Reservation;