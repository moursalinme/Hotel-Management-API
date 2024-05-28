const Room = require('../models/RoomModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllRooms = catchAsync( async (req, res, next) => {

    const rooms = await Room.find();

    res.status(200).json({
        status: "success",
        totalRooms: rooms.length,
        rooms,
    });
});

exports.getAvailableRooms = catchAsync( async (req, res, next) => {

    const rooms = await Room.find({ isAvailable: true });

    res.status(200).json({
        status: "success",
        totalRooms: rooms.length,
        rooms,
    });
});


exports.addDummyRoomData = catchAsync(async (req, res, next) => {
    const {rooms} = require('../utils/dummyRooms');
    // const {rooms} = dummyRoom;

    const addedRooms = await Room.insertMany(rooms);
    res.status(200).json ({
        status: "Added",
        addedRooms,
    })
});

exports.addNewRoom = catchAsync( async(req, res, next) => {
    const room = {
        roomNumber: req.body.roomNumber,
        type: req.body.type,
        description: req.body.description,
        stars: req.body.stars,
        price: req.body.price,
    };

    const createdRoom = await Room.create(room);

    res.status(201).json({
        status:"success",
        createdRoom,
    })
});


exports.updateRoom = catchAsync(async(req, res, next) => {
    const room = await Room.findById(req.params._id);
    
    if (!room) {
        return (res.status(404).json({ message: 'Room not found' }));
    }
    
    const allowed = ['roomNumber', 'type', 'description', 'stars', 'price', 'isAvailable'];

    const newRoom = {};

    Object.keys(req.body).forEach(key => {
        if (allowed.includes(key)) {
            newRoom[key] = req.body[key];
        }
    });

    const updatedRoom = await Room.findByIdAndUpdate(req.params._id, newRoom, {
        new: true,
        runValidators: true,
    });

    res.status(201).json({
        status:"success",
        updatedRoom,
    })

});

exports.checkRoom = catchAsync(async(req, res, next) => {

    const { roomNumber } = req.body;
    if (!roomNumber) {
        return (res.status(404).json({
            status:"failed.",
            msg: "room no not provided.",
        }));
    }
    const room = await Room.findOne({ roomNumber });

    if (!room) {
        return (res.status(404).json({
            status:"failed.",
            msg: "room no invalid. Room no does not exists.",
        }));
    }

    if (!room.isAvailable) {
        return (res.status(400).json({
            status:"failed.",
            msg: "room is not available.",
        }));
    }
    req.body.roomId = room._id;
    req.body.price = room.price;
    next();
});


exports.filterByStars = catchAsync(async(req, res, next) => {
    const { stars } =  req.body;

    const rooms = await Room.find({stars});
    res.status(200).json({
        status:"success",
        totalrooms: rooms.length,
        rooms,
    });
});
