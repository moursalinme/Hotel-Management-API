const catchAsync = require("../utils/catchAsync");
const Guest = require('../models/guestModel');
const Reservation = require('../models/reservationModel');



exports.checkGuest = catchAsync(async(req, res, next) => {

    const { email } = req.body;

    if (!email) {
        return (res.status(400).json({
            status: "bad reqq.",
            msg: "email not provided.",
        }));
    }

    const exists = await Guest.findOne({ email });
    
    if (!exists) {
        const { name, phone } = req.body;

        if (!name || !phone) {
            return (res.status(400).json({
                status: "failed.",
                msg: "provide name and phone."
            }));
        }

        const guest = {
            name, 
            phone, 
            email,
        };

        const added = await Guest.create(guest);

        req.body.guestId = added._id;
        req.body.guest = added;
        
        return next();
    }
    req.body.guestId = exists._id;
    next();
});

exports.getTopGuests = catchAsync(async(req, res, next) => {
    const limit = req.params.limit ? 1 * req.params.limit : 5;
    console.log(limit, req.params);
    const mostVisitedGuests = await Reservation.aggregate([
        {
            $group: {
                _id: '$guestId',
                totalReservations: { $sum: 1 }
            }
        },
        {
            $sort: { totalReservations: -1 }
        },
        { $limit: limit },
        {
            $lookup: {
                from: 'guests', 
                localField: '_id',
                foreignField: '_id',
                as: 'guestData'
            }
        },
        {
            $unwind: '$guestData'
        },
        {
            $project: {
                _id: 0,
                guestId: '$_id',
                totalReservations: 1,
                guestName: '$guestData.name',
                guestEmail: '$guestData.email',
                guestPhone: '$guestData.phone',
            }
        }
    ]);
  
    res.status(200).json({ mostVisitedGuests });
});


exports.getAllGuest = catchAsync(async(req, res, next) => {
    const guests = await Guest.find();

    res.status(200).json({
        status: "success",
        guests,
    });
});

exports.getGuestById = catchAsync(async(req, res, next) => {
    
    const guest = await Guest.findById(req.params._id);
    if (!guest) {
        return (res.status(404).json({
            status: "failed.",
            msg: "guest with that id does not exists.",
        }));
    }
    res.status(200).json({
        status: "success",
        guest,
    });
});
