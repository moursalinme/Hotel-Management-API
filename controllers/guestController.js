const catchAsync = require("../utils/catchAsync");
const Guest = require('../models/guestModel');


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