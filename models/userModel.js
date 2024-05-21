const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: [true, 'Please enter your username!'],
        maxlength: [50, 'Name must have maximum of 50 characters'],
        minlength: [3, 'Name must have at least 3 characters'],
        unique: [true, 'Username already exists'],
        trim: true, 
    },
    email: {
        type: String, 
        required: [true, 'Please enter your email!'],
        maxlength: [50, 'Email must have maximum of 50 characters'],
        minlength: [3, 'Email must have at least 3 characters'],
        validate: [validator.isEmail, 'Email might be invalid.'],
        unique: [true, 'Email already exists'],
        trim: true, 
    },
    phone: {
        type: String,
        unique: true,
        validate: [validator.isNumeric, 'Phone number is not valid. Please check if you have entered chars insted of numbers.'],
        select: false, 
    },
    password: { type: String, required: true, select: false },
    role: { 
        type: String, 
        enum: ['admin', 'user'], 
        default: 'user' 
    },
    dateCreated: { type: Date, default: Date.now },
});

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, process.env.PASS_SALT_LEN);
    next();
})

const User = mongoose.model('user', userSchema);
module.exports = User;


