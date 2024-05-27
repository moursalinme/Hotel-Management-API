const Room = require('../models/RoomModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

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
        return res.status(404).json({ message: 'Room not found' });
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