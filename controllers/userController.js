const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const bcrypt = require('bcrypt');


exports.deleteUser = catchAsync(async (req, res, next) => {
     
    const { userId } = req.params;
    console.log("here", userId);
    const del = await User.findByIdAndDelete(userId);

    if (!del) {
        return next(new AppError('User does not exists.!', 404));
    }

    res.status(200).json( {
        status: "User Deleted.",
    });

});

exports.getUserById = (async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
        return next(new AppError('Invalid ID. No user found!', 404));
    }
    res.status(200).json( {
        status: "success",
        user,
    });
});

exports.getAllUsers = (async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        status: "Success",
        users,
    });
});


const sendToken =  function (user, res) {
    const payload = {
        _id: user._id, 
        username: user.username,
        role: user.role,
    };

    const token = jwt.sign(
        payload, 
        process.env.JWT_SECRET_KEY, 
        { expiresIn: process.env.JWT_EXP_TIME }
    );
  
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXP_TIME * 24 * 60 * 60 * 1000),
        httpOnly: true, 
    }

    // console.log(options);
  
    res.cookie('jwt', token, options);
    res.status(201).json({
        status: 'success',
        token, 
        user, 
    });
};

exports.login = catchAsync(async (req, res, next) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return next (new AppError('username or Password not provided', 400));
    }

    const user = await User.findOne({username}).select('+password');

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return next(new AppError('Wrong username or password given.'));
    }
    return sendToken(user, res);
});

exports.register = catchAsync(async (req, res, next) => {
    const userObj = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password, 
        phone: req.body.phone,
    }

    const user = await User.create(userObj);
    sendToken(user, res);
});

exports.protect = catchAsync(async (req, res, next) => {

    if (!req.cookies.jwt) {
        return next(new AppError('You need to be logged in to access this route.', 400));
    }

    const token = req.cookies.jwt;
    const payload = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);
    // console.log('printing' , token, payload);

    const user = await User.findById(payload._id);
    if (!user) {
        return next(new AppError('No user found', 404));
    }

    req.user = user;
    next();
});

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next (new AppError('unuthorized route', 403));
        }
        next();
    }
}