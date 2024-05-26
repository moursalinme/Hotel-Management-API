const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Cancelled'], default: 'Pending' },
    cost: { type: Number },
});

// const Reservation = mongoose.model('reservation', reservationSchema);
// module.exports = Reservation;