const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');


const sendToken =  function (user, res) {
    const payload = {
        id: user._id, 
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

    console.log(options);
  
    res.cookie('jwt', token, options);
    res.status(201).json({
        status: 'success',
        token, 
        user, 
    });
};

exports.login = catchAsync(async (req, res, next) => {
    const {username, password} = req.body;
    
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