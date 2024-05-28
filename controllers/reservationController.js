const catchAsync = require("../utils/catchAsync");
const Reservation = require('../models/reservationModel');
const moment = require('moment');
const Room = require("../models/RoomModel");

exports.addReservation = catchAsync(async(req, res, next) => {

    const { durationInDays} = req.body;

    const price = durationInDays * req.body.price;
    
    const startmoment = moment();
    const endmoment = startmoment.clone().add(durationInDays, 'days').set({ hour: 13, minute: 0, second: 0 });

    const startDate = startmoment.format('hh:mm A DD/MM/YYYY');
    const endDate = endmoment.format('hh:mm A DD/MM/YYYY');

    const obj = {
        roomId: req.body.roomId,
        guestId: req.body.guestId,
        startDate,
        endDate,
        price, 
    };

    const bookingDetail = await Reservation.create(obj);

    const room = await Room.findById(req.body.roomId);
    room.isAvailable = false;
    await room.save();

    res.status(201).json({
        status: "success.",
        msg: "booking created successfully.",
        room,
        bookingDetail,
    })

});